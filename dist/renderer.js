"use strict";
(() => {
  // src/renderer.ts
  var WatchTogetherApp = class {
    constructor() {
      this.mode = "host";
      this.peerConnection = null;
      this.connectionStatus = { connected: false, message: "Disconnected" };
      this.videoElement = document.getElementById("video");
      this.initializeUI();
      this.setupVideoEventListeners();
    }
    initializeUI() {
      this.setupModeSwitch();
      this.setupHostControls();
      this.setupClientControls();
      this.updateUI();
    }
    setupModeSwitch() {
      const hostBtn = document.getElementById("host-btn");
      const clientBtn = document.getElementById("client-btn");
      hostBtn.addEventListener("click", () => {
        this.mode = "host";
        this.updateUI();
        this.disconnectPeer();
      });
      clientBtn.addEventListener("click", () => {
        this.mode = "client";
        this.updateUI();
        this.disconnectPeer();
      });
    }
    setupHostControls() {
      const fileInput = document.getElementById("file-input");
      const playBtn = document.getElementById("play-btn");
      const pauseBtn = document.getElementById("pause-btn");
      const resetBtn = document.getElementById("reset-btn");
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          this.loadVideo(url);
        }
      });
      playBtn.addEventListener("click", () => this.playVideo());
      pauseBtn.addEventListener("click", () => this.pauseVideo());
      resetBtn.addEventListener("click", () => this.resetVideo());
    }
    setupClientControls() {
      const connectBtn = document.getElementById("connect-btn");
      const addressInput = document.getElementById("address-input");
      connectBtn.addEventListener("click", () => {
        const address = addressInput.value.trim();
        if (address) {
          this.connectToHost(address);
        }
      });
    }
    setupVideoEventListeners() {
      this.videoElement.addEventListener("loadedmetadata", () => {
        if (this.mode === "host" && this.peerConnection?.dataChannel) {
          this.sendSyncMessage({
            type: "video-loaded",
            timestamp: Date.now(),
            videoUrl: this.videoElement.src
          });
        }
      });
      this.videoElement.addEventListener("play", () => {
        if (this.mode === "host" && this.peerConnection?.dataChannel) {
          this.sendSyncMessage({
            type: "play",
            timestamp: Date.now(),
            currentTime: this.videoElement.currentTime
          });
        }
      });
      this.videoElement.addEventListener("pause", () => {
        if (this.mode === "host" && this.peerConnection?.dataChannel) {
          this.sendSyncMessage({
            type: "pause",
            timestamp: Date.now(),
            currentTime: this.videoElement.currentTime
          });
        }
      });
      this.videoElement.addEventListener("seeked", () => {
        if (this.mode === "host" && this.peerConnection?.dataChannel) {
          this.sendSyncMessage({
            type: "seek",
            timestamp: Date.now(),
            currentTime: this.videoElement.currentTime
          });
        }
      });
    }
    updateUI() {
      const hostControls = document.getElementById("host-controls");
      const clientControls = document.getElementById("client-controls");
      const hostBtn = document.getElementById("host-btn");
      const clientBtn = document.getElementById("client-btn");
      if (this.mode === "host") {
        hostControls.style.display = "block";
        clientControls.style.display = "none";
        hostBtn.classList.add("active");
        clientBtn.classList.remove("active");
        this.setupHostPeer();
      } else {
        hostControls.style.display = "none";
        clientControls.style.display = "block";
        hostBtn.classList.remove("active");
        clientBtn.classList.add("active");
      }
      this.updateConnectionStatus();
    }
    updateConnectionStatus() {
      const statusElement = document.getElementById("connection-status");
      statusElement.textContent = this.connectionStatus.message;
      statusElement.className = this.connectionStatus.connected ? "connected" : "disconnected";
    }
    async setupHostPeer() {
      try {
        const connection = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        const dataChannel = connection.createDataChannel("sync", {
          ordered: true
        });
        this.peerConnection = {
          connection,
          dataChannel,
          isHost: true
        };
        dataChannel.onopen = () => {
          this.connectionStatus = { connected: true, message: "Client connected" };
          this.updateConnectionStatus();
        };
        dataChannel.onclose = () => {
          this.connectionStatus = { connected: false, message: "Client disconnected" };
          this.updateConnectionStatus();
        };
        connection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("ICE candidate:", event.candidate);
          }
        };
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        const offerElement = document.getElementById("offer-display");
        offerElement.value = JSON.stringify(offer);
        offerElement.style.display = "block";
      } catch (error) {
        console.error("Error setting up host peer:", error);
        this.connectionStatus = { connected: false, message: "Error setting up host" };
        this.updateConnectionStatus();
      }
    }
    async connectToHost(offer) {
      try {
        const connection = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        this.peerConnection = {
          connection,
          dataChannel: null,
          isHost: false
        };
        connection.ondatachannel = (event) => {
          const dataChannel = event.channel;
          this.peerConnection.dataChannel = dataChannel;
          dataChannel.onmessage = (event2) => {
            const message = JSON.parse(event2.data);
            this.handleSyncMessage(message);
          };
          dataChannel.onopen = () => {
            this.connectionStatus = { connected: true, message: "Connected to host" };
            this.updateConnectionStatus();
          };
          dataChannel.onclose = () => {
            this.connectionStatus = { connected: false, message: "Disconnected from host" };
            this.updateConnectionStatus();
          };
        };
        connection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("ICE candidate:", event.candidate);
          }
        };
        const offerData = JSON.parse(offer);
        await connection.setRemoteDescription(offerData);
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);
        const answerElement = document.getElementById("answer-display");
        answerElement.value = JSON.stringify(answer);
        answerElement.style.display = "block";
      } catch (error) {
        console.error("Error connecting to host:", error);
        this.connectionStatus = { connected: false, message: "Error connecting to host" };
        this.updateConnectionStatus();
      }
    }
    sendSyncMessage(message) {
      if (this.peerConnection?.dataChannel?.readyState === "open") {
        this.peerConnection.dataChannel.send(JSON.stringify(message));
      }
    }
    handleSyncMessage(message) {
      switch (message.type) {
        case "play":
          if (message.currentTime !== void 0) {
            this.videoElement.currentTime = message.currentTime;
          }
          this.videoElement.play();
          break;
        case "pause":
          if (message.currentTime !== void 0) {
            this.videoElement.currentTime = message.currentTime;
          }
          this.videoElement.pause();
          break;
        case "seek":
          if (message.currentTime !== void 0) {
            this.videoElement.currentTime = message.currentTime;
          }
          break;
        case "reset":
          this.videoElement.currentTime = 0;
          this.videoElement.pause();
          break;
        case "video-loaded":
          if (message.videoUrl) {
            this.videoElement.src = message.videoUrl;
          }
          break;
      }
    }
    loadVideo(url) {
      this.videoElement.src = url;
    }
    playVideo() {
      this.videoElement.play();
    }
    pauseVideo() {
      this.videoElement.pause();
    }
    resetVideo() {
      this.videoElement.currentTime = 0;
      this.videoElement.pause();
      if (this.mode === "host" && this.peerConnection?.dataChannel) {
        this.sendSyncMessage({
          type: "reset",
          timestamp: Date.now()
        });
      }
    }
    disconnectPeer() {
      if (this.peerConnection) {
        this.peerConnection.dataChannel?.close();
        this.peerConnection.connection.close();
        this.peerConnection = null;
      }
      this.connectionStatus = { connected: false, message: "Disconnected" };
      this.updateConnectionStatus();
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    new WatchTogetherApp();
  });
})();
