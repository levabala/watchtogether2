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
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      const dataChannel = connection.createDataChannel('sync', {
        ordered: true
      });

      const newPeerConnection: PeerConnection = {
        connection,
        dataChannel,
        isHost: true
      };

      setPeerConnection(newPeerConnection);

      dataChannel.onopen = () => {
        setConnectionStatus({ connected: true, message: 'Client connected' });
      };

      dataChannel.onclose = () => {
        setConnectionStatus({ connected: false, message: 'Client disconnected' });
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
        }
      };

      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);

      return JSON.stringify(offer);
    } catch (error) {
      console.error('Error setting up host peer:', error);
      setConnectionStatus({ connected: false, message: 'Error setting up host' });
      return null;
    }
  }, []);

  const connectToHost = useCallback(async (offer: string) => {
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      const newPeerConnection: PeerConnection = {
        connection,
        dataChannel: null,
        isHost: false
      };

      setPeerConnection(newPeerConnection);

      connection.ondatachannel = (event) => {
        const dataChannel = event.channel;
        newPeerConnection.dataChannel = dataChannel;

        dataChannel.onmessage = (event) => {
          const message: SyncMessage = JSON.parse(event.data);
          handleSyncMessage(message);
        };

        dataChannel.onopen = () => {
          setConnectionStatus({ connected: true, message: 'Connected to host' });
        };

        dataChannel.onclose = () => {
          setConnectionStatus({ connected: false, message: 'Disconnected from host' });
        };
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
        }
      };

      const offerData = JSON.parse(offer);
      await connection.setRemoteDescription(offerData);

      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);

      return JSON.stringify(answer);
    } catch (error) {
      console.error('Error connecting to host:', error);
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