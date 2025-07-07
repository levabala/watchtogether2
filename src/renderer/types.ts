export type AppMode = 'host' | 'client' | 'default';

declare global {
  interface Window {
    electronAPI: {
      getAppMode: () => AppMode;
    };
  }
}

export interface VideoState {
  currentTime: number;
  paused: boolean;
  duration: number;
}

export interface SyncMessage {
  type: 'play' | 'pause' | 'seek' | 'reset' | 'video-loaded' | 'ping' | 'pong';
  timestamp: number;
  currentTime?: number;
  videoUrl?: string;
}

export interface ConnectionStatus {
  connected: boolean;
  message: string;
}

export interface PeerConnection {
  connection: RTCPeerConnection;
  dataChannel: RTCDataChannel | null;
  isHost: boolean;
}