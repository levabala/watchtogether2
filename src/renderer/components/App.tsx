import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { AppMode, VideoState, SyncMessage, ConnectionStatus, PeerConnection } from '../types';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set initial mode from command line args
  useEffect(() => {
    const initialMode = window.electronAPI?.getAppMode() || 'host';
    if (initialMode !== 'default') {
      setMode(initialMode);
    }
  }, []);

  const disconnectPeer = () => {
    if (peerConnection) {
      peerConnection.dataChannel?.close();
      peerConnection.connection.close();
      setPeerConnection(null);
    }
    setConnectionStatus({ connected: false, message: 'Disconnected' });
  };

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    disconnectPeer();
  };

  const sendSyncMessage = (message: SyncMessage) => {
    if (peerConnection?.dataChannel?.readyState === 'open') {
      peerConnection.dataChannel.send(JSON.stringify(message));
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
    console.log('🚀 Host: Setting up peer connection...');
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      console.log('✅ Host: RTCPeerConnection created', connection);

      const dataChannel = connection.createDataChannel('sync', {
        ordered: true
      });
      console.log('📡 Host: Data channel created with label:', dataChannel.label, 'id:', dataChannel.id, 'readyState:', dataChannel.readyState);

      const newPeerConnection: PeerConnection = {
        connection,
        dataChannel,
        isHost: true
      };

      setPeerConnection(newPeerConnection);
      console.log('💾 Host: Peer connection stored in state');

      dataChannel.onmessage = (event) => {
        console.log('📨 Host: Raw message received:', event.data);
        const message = JSON.parse(event.data);
        
        if (message.type === 'pong') {
          console.log('🏓 Host: Received pong - connection alive', message);
        } else {
          console.log('📩 Host: Received message:', message);
        }
      };

      dataChannel.onopen = () => {
        console.log('🔓 Host: Data channel onopen triggered - readyState:', dataChannel.readyState);
        console.log('🎉 Host: Data channel opened - client connected');
        setConnectionStatus({ connected: true, message: 'Client connected' });
        
        // Start heartbeat
        console.log('💓 Host: Starting heartbeat ping from onopen');
        const heartbeat = setInterval(() => {
          if (dataChannel.readyState === 'open') {
            console.log('🏓 Host: Sending ping from onopen heartbeat...');
            dataChannel.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
          } else {
            console.log('💔 Host: Heartbeat stopped - dataChannel readyState:', dataChannel.readyState);
            clearInterval(heartbeat);
          }
        }, 5000);
      };

      // Listen for ready state changes to handle connection after acceptAnswer
      dataChannel.addEventListener('readystatechange', () => {
        console.log('🔄 Host: Data channel ready state changed to:', dataChannel.readyState);
        console.log('🔍 Host: Full dataChannel state:', {
          readyState: dataChannel.readyState,
          id: dataChannel.id,
          label: dataChannel.label,
          bufferedAmount: dataChannel.bufferedAmount
        });
        
        if (dataChannel.readyState === 'open') {
          console.log('🎯 Host: Data channel opened via readystatechange - starting ping if not already started');
          setConnectionStatus({ connected: true, message: 'Client connected' });
          
          // Start heartbeat if not already started (this handles the acceptAnswer case)
          console.log('💓 Host: Starting heartbeat ping from readystatechange');
          const heartbeat = setInterval(() => {
            if (dataChannel.readyState === 'open') {
              console.log('🏓 Host: Sending ping from readystatechange heartbeat...');
              dataChannel.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
            } else {
              console.log('💔 Host: Heartbeat stopped - dataChannel readyState:', dataChannel.readyState);
              clearInterval(heartbeat);
            }
          }, 5000);
        } else if (dataChannel.readyState === 'connecting') {
          console.log('🔗 Host: Data channel is connecting...');
        } else if (dataChannel.readyState === 'closing') {
          console.log('🔒 Host: Data channel is closing...');
        } else if (dataChannel.readyState === 'closed') {
          console.log('❌ Host: Data channel is closed');
        }
      });

      dataChannel.onclose = () => {
        console.log('🔒 Host: Data channel onclose triggered');
        console.log('💔 Host: Data channel closed - client disconnected');
        setConnectionStatus({ connected: false, message: 'Client disconnected' });
      };

      dataChannel.onerror = (error) => {
        console.error('❌ Host: Data channel error:', error);
        console.error('❌ Host: Data channel error event:', error);
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('🧊 Host: ICE candidate generated:', event.candidate);
          console.log('🧊 Host: ICE candidate details:', {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          });
        } else {
          console.log('🧊 Host: ICE gathering complete (null candidate)');
        }
      };

      connection.onconnectionstatechange = () => {
        console.log('🔄 Host: Connection state changed to:', connection.connectionState);
        console.log('🔍 Host: Full connection state:', {
          connectionState: connection.connectionState,
          iceConnectionState: connection.iceConnectionState,
          iceGatheringState: connection.iceGatheringState,
          signalingState: connection.signalingState
        });
        
        if (connection.connectionState === 'connected') {
          console.log('✅ Host: WebRTC connection established');
        } else if (connection.connectionState === 'disconnected' || connection.connectionState === 'failed') {
          console.log('💔 Host: WebRTC connection lost');
          setConnectionStatus({ connected: false, message: 'Client disconnected' });
        }
      };

      connection.oniceconnectionstatechange = () => {
        console.log('🧊 Host: ICE connection state changed to:', connection.iceConnectionState);
      };

      connection.onicegatheringstatechange = () => {
        console.log('🧊 Host: ICE gathering state changed to:', connection.iceGatheringState);
      };

      connection.onsignalingstatechange = () => {
        console.log('📡 Host: Signaling state changed to:', connection.signalingState);
      };

      console.log('📝 Host: Creating offer...');
      const offer = await connection.createOffer();
      console.log('✅ Host: Offer created:', offer);
      
      console.log('📝 Host: Setting local description...');
      await connection.setLocalDescription(offer);
      console.log('✅ Host: Local description set');
      console.log('🔍 Host: Local description details:', connection.localDescription);

      const offerString = JSON.stringify(offer);
      console.log('📦 Host: Offer stringified, length:', offerString.length);
      console.log('📤 Host: Returning offer string');
      return offerString;
    } catch (error) {
      console.error('💥 Error setting up host peer:', error);
      console.error('💥 Error stack:', error.stack);
      setConnectionStatus({ connected: false, message: 'Error setting up host' });
      return null;
    }
  }, []);

  const acceptAnswer = useCallback(async (answer: string) => {
    console.log('🎯 Host: acceptAnswer called');
    console.log('🔍 Host: peerConnection exists:', !!peerConnection);
    console.log('🔍 Host: peerConnection.isHost:', peerConnection?.isHost);
    console.log('🔍 Host: peerConnection details:', peerConnection ? {
      isHost: peerConnection.isHost,
      connectionState: peerConnection.connection.connectionState,
      signalingState: peerConnection.connection.signalingState,
      dataChannelState: peerConnection.dataChannel?.readyState
    } : 'null');
    
    if (!peerConnection || !peerConnection.isHost) {
      console.log('❌ Host: No peer connection or not host, aborting');
      return;
    }

    try {
      console.log('📝 Host: Parsing answer JSON...');
      console.log('📥 Host: Raw answer string:', answer);
      const answerData = JSON.parse(answer);
      console.log('✅ Host: Answer parsed successfully:', answerData);
      console.log('🔍 Host: Answer details:', {
        type: answerData.type,
        sdp: answerData.sdp?.substring(0, 100) + '...'
      });
      
      console.log('📡 Host: Setting remote description...');
      console.log('🔍 Host: Connection state before setRemoteDescription:', peerConnection.connection.connectionState);
      console.log('🔍 Host: Signaling state before setRemoteDescription:', peerConnection.connection.signalingState);
      console.log('🔍 Host: Data channel state before setRemoteDescription:', peerConnection.dataChannel?.readyState);
      
      await peerConnection.connection.setRemoteDescription(answerData);
      
      console.log('✅ Host: Remote description set successfully');
      console.log('🔍 Host: Connection state after setRemoteDescription:', peerConnection.connection.connectionState);
      console.log('🔍 Host: Signaling state after setRemoteDescription:', peerConnection.connection.signalingState);
      console.log('🔍 Host: Data channel state after setRemoteDescription:', peerConnection.dataChannel?.readyState);
      console.log('🔍 Host: Remote description details:', peerConnection.connection.remoteDescription);
      
      setConnectionStatus({ connected: false, message: 'Answer accepted, waiting for connection...' });
      console.log('📱 Host: Status updated to waiting for connection');
    } catch (error) {
      console.error('💥 Host: Error accepting answer:', error);
      console.error('💥 Host: Error stack:', error.stack);
      console.error('💥 Host: Error details:', {
        name: error.name,
        message: error.message,
        code: error.code
      });
      setConnectionStatus({ connected: false, message: 'Error accepting answer' });
    }
  }, [peerConnection]);

  const connectToHost = useCallback(async (offer: string) => {
    console.log('🚀 Client: Starting connection to host...');
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      console.log('✅ Client: RTCPeerConnection created', connection);

      const newPeerConnection: PeerConnection = {
        connection,
        dataChannel: null,
        isHost: false
      };

      setPeerConnection(newPeerConnection);
      console.log('💾 Client: Peer connection stored in state');

      connection.ondatachannel = (event) => {
        console.log('📡 Client: Data channel received from host:', event.channel);
        const dataChannel = event.channel;
        newPeerConnection.dataChannel = dataChannel;
        
        console.log('📡 Client: Data channel details:', {
          label: dataChannel.label,
          id: dataChannel.id,
          readyState: dataChannel.readyState,
          bufferedAmount: dataChannel.bufferedAmount
        });

        dataChannel.onmessage = (event) => {
          console.log('📨 Client: Raw message received:', event.data);
          const message: SyncMessage = JSON.parse(event.data);
          
          if (message.type === 'ping') {
            console.log('🏓 Client: Received ping, sending pong...', message);
            const pongMessage = { type: 'pong', timestamp: Date.now() };
            console.log('🏓 Client: Sending pong:', pongMessage);
            dataChannel.send(JSON.stringify(pongMessage));
          } else if (message.type === 'pong') {
            console.log('🏓 Client: Received pong', message);
          } else {
            console.log('📩 Client: Received sync message:', message);
            handleSyncMessage(message);
          }
        };

        dataChannel.onopen = () => {
          console.log('🔓 Client: Data channel onopen triggered - readyState:', dataChannel.readyState);
          console.log('🎉 Client: Data channel opened - connected to host');
          setConnectionStatus({ connected: true, message: 'Connected to host' });
        };

        dataChannel.onclose = () => {
          console.log('🔒 Client: Data channel onclose triggered');
          console.log('💔 Client: Data channel closed - disconnected from host');
          setConnectionStatus({ connected: false, message: 'Disconnected from host' });
        };

        dataChannel.onerror = (error) => {
          console.error('❌ Client: Data channel error:', error);
          console.error('❌ Client: Data channel error event:', error);
        };

        dataChannel.addEventListener('readystatechange', () => {
          console.log('🔄 Client: Data channel ready state changed to:', dataChannel.readyState);
          console.log('🔍 Client: Full dataChannel state:', {
            readyState: dataChannel.readyState,
            id: dataChannel.id,
            label: dataChannel.label,
            bufferedAmount: dataChannel.bufferedAmount
          });
        });
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('🧊 Client: ICE candidate generated:', event.candidate);
          console.log('🧊 Client: ICE candidate details:', {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          });
        } else {
          console.log('🧊 Client: ICE gathering complete (null candidate)');
        }
      };

      connection.onconnectionstatechange = () => {
        console.log('🔄 Client: Connection state changed to:', connection.connectionState);
        console.log('🔍 Client: Full connection state:', {
          connectionState: connection.connectionState,
          iceConnectionState: connection.iceConnectionState,
          iceGatheringState: connection.iceGatheringState,
          signalingState: connection.signalingState
        });
        
        if (connection.connectionState === 'connected') {
          console.log('✅ Client: WebRTC connection established');
        } else if (connection.connectionState === 'disconnected' || connection.connectionState === 'failed') {
          console.log('💔 Client: WebRTC connection lost');
          setConnectionStatus({ connected: false, message: 'Disconnected from host' });
        }
      };

      connection.oniceconnectionstatechange = () => {
        console.log('🧊 Client: ICE connection state changed to:', connection.iceConnectionState);
      };

      connection.onicegatheringstatechange = () => {
        console.log('🧊 Client: ICE gathering state changed to:', connection.iceGatheringState);
      };

      connection.onsignalingstatechange = () => {
        console.log('📡 Client: Signaling state changed to:', connection.signalingState);
      };

      console.log('📥 Client: Raw offer string:', offer);
      console.log('📝 Client: Parsing offer JSON...');
      const offerData = JSON.parse(offer);
      console.log('✅ Client: Offer parsed successfully:', offerData);
      console.log('🔍 Client: Offer details:', {
        type: offerData.type,
        sdp: offerData.sdp?.substring(0, 100) + '...'
      });
      
      console.log('📡 Client: Setting remote description...');
      await connection.setRemoteDescription(offerData);
      console.log('✅ Client: Remote description set');
      console.log('🔍 Client: Remote description details:', connection.remoteDescription);

      console.log('📝 Client: Creating answer...');
      const answer = await connection.createAnswer();
      console.log('✅ Client: Answer created:', answer);
      
      console.log('📝 Client: Setting local description...');
      await connection.setLocalDescription(answer);
      console.log('✅ Client: Local description set');
      console.log('🔍 Client: Local description details:', connection.localDescription);

      const answerString = JSON.stringify(answer);
      console.log('📦 Client: Answer stringified, length:', answerString.length);
      console.log('📤 Client: Returning answer string');
      return answerString;
    } catch (error) {
      console.error('💥 Error connecting to host:', error);
      console.error('💥 Error stack:', error.stack);
      console.error('💥 Error details:', {
        name: error.name,
        message: error.message,
        code: error.code
      });
      setConnectionStatus({ connected: false, message: 'Error connecting to host' });
      return null;
    }
  }, [handleSyncMessage]);

  const handleVideoEvent = (eventType: string, currentTime?: number) => {
    if (mode === 'host' && peerConnection?.dataChannel) {
      const message: SyncMessage = {
        type: eventType as any,
        timestamp: Date.now(),
        currentTime
      };
      sendSyncMessage(message);
    }
  };

  const handleVideoLoad = (url: string) => {
    if (mode === 'host' && peerConnection?.dataChannel) {
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
            onAcceptAnswer={acceptAnswer}
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