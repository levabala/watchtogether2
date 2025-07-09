import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ConnectionStatus } from '../types';

interface ClientControlsProps {
  connectionStatus: ConnectionStatus;
  onConnectToHost: (hostPeerId: string) => Promise<string | null>;
}

export default function ClientControls({ connectionStatus, onConnectToHost }: ClientControlsProps) {
  const [peerIdInput, setPeerIdInput] = useState<string>('');

  const handleConnect = async () => {
    if (peerIdInput.trim()) {
      await onConnectToHost(peerIdInput.trim());
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-6">Client Controls</h3>
      
      <div className="space-y-6">
        <div className="flex gap-3">
          <input
            type="text"
            data-testid="peer-id-input"
            value={peerIdInput}
            onChange={(e) => setPeerIdInput((e.target as HTMLInputElement).value)}
            placeholder="Enter host's Peer ID here..."
            className="flex-1 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400"
          />
          <button
            data-testid="connect-button"
            onClick={handleConnect}
            disabled={!peerIdInput.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Connect
          </button>
        </div>

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
      </div>
    </div>
  );
}