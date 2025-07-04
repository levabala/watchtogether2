import { AppMode, VideoState, SyncMessage, ConnectionStatus, PeerConnection } from './types';

class WatchTogetherApp {
  private mode: AppMode = 'host';
  private videoElement: HTMLVideoElement;
  private peerConnection: PeerConnection | null = null;
  private connectionStatus: ConnectionStatus = { connected: false, message: 'Disconnected' };
  
  constructor() {
    this.videoElement = document.getElementById('video') as HTMLVideoElement;
    this.initializeUI();
    this.setupVideoEventListeners();
  }

  private initializeUI(): void {
    this.setupModeSwitch();
    this.setupHostControls();
    this.setupClientControls();
    this.updateUI();
  }

  private setupModeSwitch(): void {
    const hostBtn = document.getElementById('host-btn') as HTMLButtonElement;
    const clientBtn = document.getElementById('client-btn') as HTMLButtonElement;

    hostBtn.addEventListener('click', () => {
      this.mode = 'host';
      this.updateUI();
      this.disconnectPeer();
    });

    clientBtn.addEventListener('click', () => {
      this.mode = 'client';
      this.updateUI();
      this.disconnectPeer();
    });
  }

  private setupHostControls(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;
    const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;

    fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        this.loadVideo(url);
      }
    });

    playBtn.addEventListener('click', () => this.playVideo());
    pauseBtn.addEventListener('click', () => this.pauseVideo());
    resetBtn.addEventListener('click', () => this.resetVideo());
  }

  private setupClientControls(): void {
    const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement;
    const addressInput = document.getElementById('address-input') as HTMLInputElement;

    connectBtn.addEventListener('click', () => {
      const address = addressInput.value.trim();
      if (address) {
        this.connectToHost(address);
      }
    });
  }

  private setupVideoEventListeners(): void {
    this.videoElement.addEventListener('loadedmetadata', () => {
      if (this.mode === 'host' && this.peerConnection?.dataChannel) {
        this.sendSyncMessage({
          type: 'video-loaded',
          timestamp: Date.now(),
          videoUrl: this.videoElement.src
        });
      }
    });

    this.videoElement.addEventListener('play', () => {
      if (this.mode === 'host' && this.peerConnection?.dataChannel) {
        this.sendSyncMessage({
          type: 'play',
          timestamp: Date.now(),
          currentTime: this.videoElement.currentTime
        });
      }
    });

    this.videoElement.addEventListener('pause', () => {
      if (this.mode === 'host' && this.peerConnection?.dataChannel) {
        this.sendSyncMessage({
          type: 'pause',
          timestamp: Date.now(),
          currentTime: this.videoElement.currentTime
        });
      }
    });

    this.videoElement.addEventListener('seeked', () => {
      if (this.mode === 'host' && this.peerConnection?.dataChannel) {
        this.sendSyncMessage({
          type: 'seek',
          timestamp: Date.now(),
          currentTime: this.videoElement.currentTime
        });
      }
    });
  }

  private updateUI(): void {
    const hostControls = document.getElementById('host-controls') as HTMLElement;
    const clientControls = document.getElementById('client-controls') as HTMLElement;
    const hostBtn = document.getElementById('host-btn') as HTMLButtonElement;
    const clientBtn = document.getElementById('client-btn') as HTMLButtonElement;

    if (this.mode === 'host') {
      hostControls.style.display = 'block';
      clientControls.style.display = 'none';
      hostBtn.classList.add('active');
      clientBtn.classList.remove('active');
      this.setupHostPeer();
    } else {
      hostControls.style.display = 'none';
      clientControls.style.display = 'block';
      hostBtn.classList.remove('active');
      clientBtn.classList.add('active');
    }

    this.updateConnectionStatus();
  }

  private updateConnectionStatus(): void {
    const statusElement = document.getElementById('connection-status') as HTMLElement;
    statusElement.textContent = this.connectionStatus.message;
    statusElement.className = this.connectionStatus.connected ? 'connected' : 'disconnected';
  }

  private async setupHostPeer(): Promise<void> {
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      const dataChannel = connection.createDataChannel('sync', {
        ordered: true
      });

      this.peerConnection = {
        connection,
        dataChannel,
        isHost: true
      };

      dataChannel.onopen = () => {
        this.connectionStatus = { connected: true, message: 'Client connected' };
        this.updateConnectionStatus();
      };

      dataChannel.onclose = () => {
        this.connectionStatus = { connected: false, message: 'Client disconnected' };
        this.updateConnectionStatus();
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
        }
      };

      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);

      const offerElement = document.getElementById('offer-display') as HTMLTextAreaElement;
      offerElement.value = JSON.stringify(offer);
      offerElement.style.display = 'block';

    } catch (error) {
      console.error('Error setting up host peer:', error);
      this.connectionStatus = { connected: false, message: 'Error setting up host' };
      this.updateConnectionStatus();
    }
  }

  private async connectToHost(offer: string): Promise<void> {
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      this.peerConnection = {
        connection,
        dataChannel: null,
        isHost: false
      };

      connection.ondatachannel = (event) => {
        const dataChannel = event.channel;
        this.peerConnection!.dataChannel = dataChannel;

        dataChannel.onmessage = (event) => {
          const message: SyncMessage = JSON.parse(event.data);
          this.handleSyncMessage(message);
        };

        dataChannel.onopen = () => {
          this.connectionStatus = { connected: true, message: 'Connected to host' };
          this.updateConnectionStatus();
        };

        dataChannel.onclose = () => {
          this.connectionStatus = { connected: false, message: 'Disconnected from host' };
          this.updateConnectionStatus();
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

      const answerElement = document.getElementById('answer-display') as HTMLTextAreaElement;
      answerElement.value = JSON.stringify(answer);
      answerElement.style.display = 'block';

    } catch (error) {
      console.error('Error connecting to host:', error);
      this.connectionStatus = { connected: false, message: 'Error connecting to host' };
      this.updateConnectionStatus();
    }
  }

  private sendSyncMessage(message: SyncMessage): void {
    if (this.peerConnection?.dataChannel?.readyState === 'open') {
      this.peerConnection.dataChannel.send(JSON.stringify(message));
    }
  }

  private handleSyncMessage(message: SyncMessage): void {
    switch (message.type) {
      case 'play':
        if (message.currentTime !== undefined) {
          this.videoElement.currentTime = message.currentTime;
        }
        this.videoElement.play();
        break;
      case 'pause':
        if (message.currentTime !== undefined) {
          this.videoElement.currentTime = message.currentTime;
        }
        this.videoElement.pause();
        break;
      case 'seek':
        if (message.currentTime !== undefined) {
          this.videoElement.currentTime = message.currentTime;
        }
        break;
      case 'reset':
        this.videoElement.currentTime = 0;
        this.videoElement.pause();
        break;
      case 'video-loaded':
        if (message.videoUrl) {
          this.videoElement.src = message.videoUrl;
        }
        break;
    }
  }

  private loadVideo(url: string): void {
    this.videoElement.src = url;
  }

  private playVideo(): void {
    this.videoElement.play();
  }

  private pauseVideo(): void {
    this.videoElement.pause();
  }

  private resetVideo(): void {
    this.videoElement.currentTime = 0;
    this.videoElement.pause();
    
    if (this.mode === 'host' && this.peerConnection?.dataChannel) {
      this.sendSyncMessage({
        type: 'reset',
        timestamp: Date.now()
      });
    }
  }

  private disconnectPeer(): void {
    if (this.peerConnection) {
      this.peerConnection.dataChannel?.close();
      this.peerConnection.connection.close();
      this.peerConnection = null;
    }
    this.connectionStatus = { connected: false, message: 'Disconnected' };
    this.updateConnectionStatus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WatchTogetherApp();
});