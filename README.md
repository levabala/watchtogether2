# Watch Together - P2P Video Streaming Prototype

A collaborative video watching application built with Electron and TypeScript that enables synchronized video playbook between host and client using WebRTC peer-to-peer connections.

## Features

- **Host Mode**: Select and control video playback, share with clients
- **Client Mode**: Connect to host and watch videos in sync
- **Real-time Synchronization**: Play, pause, seek, and reset commands are synchronized
- **WebRTC P2P Connection**: Direct peer-to-peer communication without central server
- **TypeScript**: Fully typed codebase for better development experience

## Installation

```bash
pnpm install
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## How to Use

### Host Setup
1. Start the application
2. Ensure "Host" mode is selected (default)
3. Click "Select Video File" and choose a video file
4. Copy the offer text that appears in the text area
5. Share this offer with the client
6. Use the Play/Pause/Reset controls to control playback

### Client Setup
1. Start the application (or open a second instance)
2. Click "Client" mode
3. Paste the host's offer into the address input field
4. Click "Connect"
5. Copy the answer text that appears and send it back to the host
6. The host needs to manually handle the answer (this is a prototype limitation)

### Current Limitations
- Manual WebRTC signaling (offer/answer exchange)
- No signaling server (requires manual copy/paste)
- Single client per host
- No video streaming (only control synchronization)

## Architecture

- **Main Process** (`src/main.ts`): Electron main process
- **Renderer Process** (`src/renderer.ts`): UI and WebRTC logic
- **Types** (`src/types.ts`): TypeScript type definitions
- **HTML Interface** (`index.html`): User interface

## Technical Details

- **WebRTC Data Channels**: For real-time command synchronization
- **TypeScript**: Strict typing with full type checking
- **Electron**: Cross-platform desktop application
- **No External Dependencies**: Pure WebRTC implementation

## Next Steps for Full Implementation

1. Add signaling server for automatic offer/answer exchange
2. Implement actual video streaming through WebRTC
3. Support multiple clients per host
4. Add video chunking and buffering strategies
5. Implement relay peer selection for scaling
6. Add error handling and reconnection logic
