import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { Peer } from 'peerjs';
import { AppMode, SyncMessage, ConnectionStatus, PeerConnection } from '../types';
import ModeSwitcher from './ModeSwitcher';
import VideoPlayer from './VideoPlayer';
import HostControls from './HostControls';
import ClientControls from './ClientControls';

export default function App() {
  const [mode, setMode] = useState<AppMode>('host');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ 
    connected: false, 
    message: 'Disconnected' 
  });
  const [peerConnection, setPeerConnection] = useState<PeerConnection | null>(null);
  const [lastHostPeerId, setLastHostPeerId] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set initial mode from command line args
  useEffect(() => {
    const initialMode = window.electronAPI?.getAppMode() || 'host';
    if (initialMode !== 'default') {
      setMode(initialMode);
    }
  }, []);

  const disconnectPeer = useCallback(() => {
    console.log('🔌 Disconnecting peer...');
    
    if (peerConnection) {
      try {
        // Close data connection first
        if (peerConnection.dataConnection) {
          console.log('🔌 Closing data connection...');
          peerConnection.dataConnection.close();
        }
        
        // Destroy peer instance
        if (peerConnection.peer && !peerConnection.peer.destroyed) {
          console.log('🔌 Destroying peer...');
          peerConnection.peer.destroy();
        }
        
        setPeerConnection(null);
        console.log('✅ Peer disconnected successfully');
      } catch (error) {
        console.error('❌ Error during disconnect:', error);
      }
    }
    
    setConnectionStatus({ connected: false, message: 'Disconnected' });
  }, [peerConnection]);

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    disconnectPeer();
  };

  const sendSyncMessage = (message: SyncMessage) => {
    if (peerConnection?.dataConnection?.open) {
      peerConnection.dataConnection.send(message);
    }
  };

  const handleSyncMessage = (message: SyncMessage) => {
    const video = videoRef.current;
    if (!video) return;

    switch (message.type) {
      case 'play':
        if (message.currentTime !== undefined) {
          video.currentTime = message.currentTime;
        }
        video.play();
        break;
      case 'pause':
        if (message.currentTime !== undefined) {
          video.currentTime = message.currentTime;
        }
        video.pause();
        break;
      case 'seek':
        if (message.currentTime !== undefined) {
          video.currentTime = message.currentTime;
        }
        break;
      case 'reset':
        video.currentTime = 0;
        video.pause();
        break;
      case 'video-loaded':
        if (message.videoUrl) {
          video.src = message.videoUrl;
        }
        break;
    }
  };

  const setupHostPeer = useCallback(async () => {
    console.log('🚀 Host: Setting up PeerJS peer...');
    setConnectionStatus({ connected: false, message: 'Setting up host...' });
    
    try {
      // Create a new Peer instance for the host
      const peer = new Peer({
        config: {}
      });

      console.log('✅ Host: PeerJS Peer created', peer);

      const newPeerConnection: PeerConnection = {
        peer,
        dataConnection: null,
        isHost: true
      };

      setPeerConnection(newPeerConnection);
      console.log('💾 Host: Peer connection stored in state');

      // Wait for peer to be ready and get its ID
      return new Promise<string>((resolve, reject) => {
        let setupTimeout: number | null = null;
        let isResolved = false;

        // Set up timeout for peer initialization
        setupTimeout = setTimeout(() => {
          if (!isResolved) {
            console.error('⏰ Host: Peer setup timeout');
            setConnectionStatus({ connected: false, message: 'Host setup timeout - try again' });
            peer.destroy();
            setPeerConnection(null);
            reject(new Error('Peer setup timeout'));
          }
        }, 10000); // 10 second timeout

        peer.on('open', (id) => {
          if (isResolved) return;
          isResolved = true;
          
          if (setupTimeout) {
            clearTimeout(setupTimeout);
            setupTimeout = null;
          }
          
          console.log('🎉 Host: Peer opened with ID:', id);
          newPeerConnection.peerId = id;
          setConnectionStatus({ connected: false, message: `Waiting for client... (ID: ${id})` });
          resolve(id);
        });

        peer.on('connection', (conn) => {
          console.log('📡 Host: Incoming connection from:', conn.peer, conn);
          newPeerConnection.dataConnection = conn;

          let heartbeatInterval: number | null = null;
          let connectionTimeout: number | null = null;

          // Set timeout for data connection to open
          connectionTimeout = setTimeout(() => {
            if (!conn.open) {
              console.error('⏰ Host: Data connection timeout');
              setConnectionStatus({ connected: false, message: 'Client connection timeout' });
              conn.close();
            }
          }, 15000); // 15 second timeout for data connection

          const startHeartbeat = () => {
            if (heartbeatInterval) {
              console.log('💓 Host: Heartbeat already running, skipping');
              return;
            }
            
            console.log('💓 Host: Starting heartbeat ping');
            heartbeatInterval = setInterval(() => {
              if (conn.open) {
                console.log('🏓 Host: Sending ping...');
                conn.send({ type: 'ping', timestamp: Date.now() });
              } else {
                console.log('💔 Host: Heartbeat stopped - connection closed');
                if (heartbeatInterval) {
                  clearInterval(heartbeatInterval);
                  heartbeatInterval = null;
                }
              }
            }, 5000);
          };

          const cleanup = () => {
            if (heartbeatInterval) {
              clearInterval(heartbeatInterval);
              heartbeatInterval = null;
            }
            if (connectionTimeout) {
              clearTimeout(connectionTimeout);
              connectionTimeout = null;
            }
          };

          conn.on('open', () => {
            console.log('🎉 Host: Data connection opened - client connected');
            setConnectionStatus({ connected: true, message: 'Client connected' });
            cleanup();
            startHeartbeat();
          });

          conn.on('data', (data) => {
            console.log('📨 Host: Message received:', data);
            const message = data as SyncMessage;
            
            if (message.type === 'pong') {
              console.log('🏓 Host: Received pong - connection alive', message);
            } else {
              console.log('📩 Host: Received sync message:', message);
            }
          });

          conn.on('close', () => {
            console.log('💔 Host: Data connection closed - client disconnected');
            setConnectionStatus({ connected: false, message: 'Client disconnected' });
            cleanup();
          });

          conn.on('error', (error) => {
            console.error('❌ Host: Data connection error:', error);
            setConnectionStatus({ connected: false, message: `Connection error: ${error.message || 'Unknown error'}` });
            cleanup();
          });
        });

        peer.on('error', (error) => {
          if (isResolved) return;
          isResolved = true;
          
          if (setupTimeout) {
            clearTimeout(setupTimeout);
            setupTimeout = null;
          }
          
          console.error('💥 Host: Peer error:', error);
          let errorMessage = 'Error setting up host';
          
          if (error.type === 'network') {
            errorMessage = 'Network error - check internet connection';
          } else if (error.type === 'server-error') {
            errorMessage = 'Server error - try again later';
          } else if (error.type === 'unavailable-id') {
            errorMessage = 'ID unavailable - try again';
          }
          
          setConnectionStatus({ connected: false, message: errorMessage });
          setPeerConnection(null);
          reject(error);
        });

        peer.on('disconnected', () => {
          console.log('🔌 Host: Peer disconnected from signaling server');
          setConnectionStatus({ connected: false, message: 'Disconnected from server - reconnecting...' });
          
          // Try to reconnect
          setTimeout(() => {
            if (!peer.destroyed) {
              peer.reconnect();
            }
          }, 1000);
        });
      });
    } catch (error) {
      console.error('💥 Error setting up host peer:', error);
      setConnectionStatus({ connected: false, message: 'Error setting up host' });
      setPeerConnection(null);
      return null;
    }
  }, []);



  const connectToHost = useCallback(async (hostPeerId: string, retryCount = 0) => {
    // Store the host peer ID for potential retries
    setLastHostPeerId(hostPeerId);
    const maxRetries = 3;
    console.log(`🚀 Client: Starting connection to host with ID: ${hostPeerId} (attempt ${retryCount + 1}/${maxRetries + 1})`);
    
    setConnectionStatus({ connected: false, message: `Connecting to host... (${retryCount + 1}/${maxRetries + 1})` });
    
    try {
      // Create a new Peer instance for the client
      const peer = new Peer({
        config: {}
      });

      console.log('✅ Client: PeerJS Peer created', peer);

      const newPeerConnection: PeerConnection = {
        peer,
        dataConnection: null,
        isHost: false
      };

      setPeerConnection(newPeerConnection);
      console.log('💾 Client: Peer connection stored in state');

      return new Promise<string>((resolve, reject) => {
        let setupTimeout: number | null = null;
        let connectionTimeout: number | null = null;
        let isResolved = false;

        // Set up timeout for peer initialization
        setupTimeout = setTimeout(() => {
          if (!isResolved) {
            console.error('⏰ Client: Peer setup timeout');
            peer.destroy();
            setPeerConnection(null);
            
            if (retryCount < maxRetries) {
              console.log(`🔄 Client: Retrying connection (${retryCount + 1}/${maxRetries})...`);
              setTimeout(() => {
                connectToHost(hostPeerId, retryCount + 1).then(resolve).catch(reject);
              }, 2000);
            } else {
              setConnectionStatus({ connected: false, message: 'Connection timeout - check host ID' });
              reject(new Error('Peer setup timeout'));
            }
          }
        }, 10000); // 10 second timeout

        const cleanup = () => {
          if (setupTimeout) {
            clearTimeout(setupTimeout);
            setupTimeout = null;
          }
          if (connectionTimeout) {
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
          }
        };

        peer.on('open', (id) => {
          if (isResolved) return;
          
          console.log('🎉 Client: Peer opened with ID:', id);
          newPeerConnection.peerId = id;
          
          // Connect to the host
          console.log('📡 Client: Connecting to host:', hostPeerId);
          setConnectionStatus({ connected: false, message: 'Connecting to host...' });
          
          const conn = peer.connect(hostPeerId);
          newPeerConnection.dataConnection = conn;

          // Set timeout for data connection to open
          connectionTimeout = setTimeout(() => {
            if (!conn.open && !isResolved) {
              console.error('⏰ Client: Data connection timeout');
              conn.close();
              
              if (retryCount < maxRetries) {
                console.log(`🔄 Client: Retrying connection (${retryCount + 2}/${maxRetries + 1})...`);
                cleanup();
                peer.destroy();
                setPeerConnection(null);
                setTimeout(() => {
                  connectToHost(hostPeerId, retryCount + 1).then(resolve).catch(reject);
                }, 2000);
              } else {
                setConnectionStatus({ connected: false, message: 'Connection timeout - host may be offline' });
                cleanup();
                reject(new Error('Data connection timeout'));
              }
            }
          }, 15000); // 15 second timeout for data connection

          console.log(conn);

          conn.on('open', () => {
            if (isResolved) return;
            isResolved = true;
            
            console.log('🎉 Client: Data connection opened - connected to host');
            setConnectionStatus({ connected: true, message: 'Connected to host' });
            cleanup();
            resolve('Connected');
          });

          conn.on('data', (data) => {
            console.log('📨 Client: Message received:', data);
            const message = data as SyncMessage;
            
            if (message.type === 'ping') {
              console.log('🏓 Client: Received ping, sending pong...', message);
              const pongMessage = { type: 'pong', timestamp: Date.now() };
              console.log('🏓 Client: Sending pong:', pongMessage);
              conn.send(pongMessage);
            } else if (message.type === 'pong') {
              console.log('🏓 Client: Received pong', message);
            } else {
              console.log('📩 Client: Received sync message:', message);
              handleSyncMessage(message);
            }
          });

          conn.on('close', () => {
            console.log('💔 Client: Data connection closed - disconnected from host');
            setConnectionStatus({ connected: false, message: 'Disconnected from host' });
            cleanup();
          });

          conn.on('error', (error) => {
            console.error('❌ Client: Data connection error:', error);
            
            if (!isResolved) {
              if (retryCount < maxRetries) {
                console.log(`🔄 Client: Retrying after connection error (${retryCount + 2}/${maxRetries + 1})...`);
                cleanup();
                peer.destroy();
                setPeerConnection(null);
                setTimeout(() => {
                  connectToHost(hostPeerId, retryCount + 1).then(resolve).catch(reject);
                }, 2000);
              } else {
                setConnectionStatus({ connected: false, message: `Connection failed: ${error.message || 'Unknown error'}` });
                cleanup();
                reject(error);
              }
            } else {
              setConnectionStatus({ connected: false, message: 'Connection lost' });
              cleanup();
            }
          });
        });

        peer.on('error', (error) => {
          if (isResolved) return;
          
          console.error('💥 Client: Peer error:', error);
          cleanup();
          
          let errorMessage = 'Error connecting to host';
          let shouldRetry = false;
          
          if (error.type === 'network') {
            errorMessage = 'Network error - check internet connection';
            shouldRetry = true;
          } else if (error.type === 'server-error') {
            errorMessage = 'Server error - try again later';
            shouldRetry = true;
          } else if (error.type === 'peer-unavailable') {
            errorMessage = 'Host not found - check host ID';
          } else if (error.type === 'unavailable-id') {
            errorMessage = 'ID unavailable - try again';
            shouldRetry = true;
          }
          
          if (shouldRetry && retryCount < maxRetries) {
            console.log(`🔄 Client: Retrying after peer error (${retryCount + 2}/${maxRetries + 1})...`);
            peer.destroy();
            setPeerConnection(null);
            setTimeout(() => {
              connectToHost(hostPeerId, retryCount + 1).then(resolve).catch(reject);
            }, 2000);
          } else {
            setConnectionStatus({ connected: false, message: errorMessage });
            setPeerConnection(null);
            reject(error);
          }
        });

        peer.on('disconnected', () => {
          console.log('🔌 Client: Peer disconnected from signaling server');
          if (!isResolved) {
            setConnectionStatus({ connected: false, message: 'Disconnected from server - reconnecting...' });
            
            // Try to reconnect
            setTimeout(() => {
              if (!peer.destroyed) {
                peer.reconnect();
              }
            }, 1000);
          }
        });
      });
    } catch (error) {
      console.error('💥 Error connecting to host:', error);
      
      if (retryCount < maxRetries) {
        console.log(`🔄 Client: Retrying after catch error (${retryCount + 2}/${maxRetries + 1})...`);
        setTimeout(() => {
          return connectToHost(hostPeerId, retryCount + 1);
        }, 2000);
      } else {
        setConnectionStatus({ connected: false, message: 'Error connecting to host' });
        setPeerConnection(null);
      }
      return null;
    }
  }, [handleSyncMessage]);

  const handleVideoEvent = (eventType: string, currentTime?: number) => {
    if (mode === 'host' && peerConnection?.dataConnection) {
      const message: SyncMessage = {
        type: eventType as any,
        timestamp: Date.now(),
        currentTime
      };
      sendSyncMessage(message);
    }
  };

  const handleVideoLoad = (url: string) => {
    if (mode === 'host' && peerConnection?.dataConnection) {
      sendSyncMessage({
        type: 'video-loaded',
        timestamp: Date.now(),
        videoUrl: url
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Watch Together</h1>
        
        <ModeSwitcher 
          currentMode={mode} 
          onModeChange={handleModeChange} 
        />
        
        <VideoPlayer 
          ref={videoRef}
          onVideoEvent={handleVideoEvent}
          onVideoLoad={handleVideoLoad}
        />
        
        {mode === 'host' ? (
          <HostControls 
            videoRef={videoRef}
            onSetupPeer={setupHostPeer}
            onVideoEvent={handleVideoEvent}
            connectionStatus={connectionStatus}
          />
        ) : (
          <ClientControls 
            connectionStatus={connectionStatus}
            onConnectToHost={connectToHost}
          />
        )}
      </div>
    </div>
  );
}
