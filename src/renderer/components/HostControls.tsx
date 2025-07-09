import { h } from 'preact';
import { useState } from 'preact/hooks';
import { RefObject } from 'preact';
import { ConnectionStatus } from '../types';

interface HostControlsProps {
  videoRef: RefObject<HTMLVideoElement>;
  onSetupPeer: () => Promise<string | null>;
  onVideoEvent: (eventType: string, currentTime?: number) => void;
  connectionStatus: ConnectionStatus;
}

export default function HostControls({ videoRef, onSetupPeer, onVideoEvent, connectionStatus }: HostControlsProps) {
  const [peerId, setPeerId] = useState<string>('');
  const [isHosting, setIsHosting] = useState<boolean>(false);

  const handleStartHosting = async () => {
    const hostPeerId = await onSetupPeer();
    if (hostPeerId) {
      setPeerId(hostPeerId);
      setIsHosting(true);
    }
  };

  const handleFileSelect = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      onVideoEvent('reset');
    }
  };

  const copyPeerId = () => {
    if (peerId) {
      navigator.clipboard.writeText(peerId);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-6">Host Controls</h3>
      
      <div className="space-y-6">
        {!isHosting && (
          <div className="text-center">
            <button
              data-testid="start-hosting-button"
              onClick={handleStartHosting}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Start Hosting
            </button>
          </div>
        )}

        {isHosting && (
          <>
            <div
              data-testid="connection-status"
              className={`p-3 rounded-lg text-center font-medium ${
                connectionStatus.connected
                  ? 'bg-green-900 text-green-300'
                  : 'bg-red-900 text-red-300'
              }`}
            >
              {connectionStatus.message}
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="file-input" className="text-gray-300 font-medium">
                Select Video File:
              </label>
              <input
                type="file"
                id="file-input"
                accept="video/*"
                onChange={handleFileSelect}
                className="flex-1 p-2 bg-gray-900 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePlay}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play
              </button>
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset
              </button>
            </div>

            <div>
              <label htmlFor="peer-id-display" className="block text-gray-300 mb-2">
                Share this Peer ID with the client:
              </label>
              <div className="flex gap-3">
                <input
                  id="peer-id-display"
                  data-testid="peer-id-display"
                  value={peerId}
                  readOnly
                  placeholder="Peer ID will appear here..."
                  className="flex-1 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm"
                />
                <button
                  onClick={copyPeerId}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Copy ID
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}