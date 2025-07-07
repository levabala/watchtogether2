import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Ref } from 'preact';

interface HostControlsProps {
  videoRef: Ref<HTMLVideoElement>;
  onSetupPeer: () => Promise<string | null>;
  onVideoEvent: (eventType: string, currentTime?: number) => void;
}

export default function HostControls({ videoRef, onSetupPeer, onVideoEvent }: HostControlsProps) {
  const [offer, setOffer] = useState<string>('');

  useEffect(() => {
    const setupPeer = async () => {
      const offerData = await onSetupPeer();
      if (offerData) {
        setOffer(offerData);
      }
    };
    setupPeer();
  }, []); // Empty dependency array - only run once on mount

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

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-6">Host Controls</h3>
      
      <div className="space-y-6">
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
          <label htmlFor="offer-display" className="block text-gray-300 mb-2">
            Share this offer with the client:
          </label>
          <textarea
            id="offer-display"
            value={offer}
            readOnly
            placeholder="Offer will appear here..."
            className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-y"
          />
        </div>
      </div>
    </div>
  );
}