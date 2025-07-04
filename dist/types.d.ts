export type AppMode = 'host' | 'client';
export interface VideoState {
    currentTime: number;
    paused: boolean;
    duration: number;
}
export interface SyncMessage {
    type: 'play' | 'pause' | 'seek' | 'reset' | 'video-loaded';
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
//# sourceMappingURL=types.d.ts.map