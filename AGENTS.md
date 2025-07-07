# AGENTS.md

## Project Overview
This is an Electron application for **collaborative movies and series watching** using **P2P streaming of local video files**. The app enables users to watch videos together in sync, sharing their local media files through peer-to-peer connections. Built with Electron, Preact, and Tailwind CSS v4.

## Tech Stack
- **Frontend**: Preact with TypeScript and JSX
- **Styling**: Tailwind CSS v4
- **Build Tool**: esbuild
- **Package Manager**: pnpm
- **Desktop Framework**: Electron

## Build/Test Commands
- **Install dependencies**: `pnpm install`
- **Build project**: `pnpm run build` (builds both CSS and JS)
- **Start Electron app**: `npx electron .` or `pnpm exec electron .`

## Code Style Guidelines
- **TypeScript** with strict mode enabled
- **Preact components** using hooks (useState, useEffect, useCallback)
- **JSX** enabled in tsconfig.json with `react-jsx` and `jsxImportSource: "preact"`
- **Tailwind CSS** utility classes for styling
- **Component-based architecture** with modular file structure

## Core Features
- **P2P Video Streaming**: Stream local video files directly between peers without central server but maybe via a proxy
- **Synchronized Playback**: Keep all participants in sync during movie/series watching
- **Media Sharing**: Share local video files with other participants
- **WebRTC Integration**: Real-time peer-to-peer communication for synchronization
