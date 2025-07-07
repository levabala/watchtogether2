import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ConnectionStatus } from '../types';

interface ClientControlsProps {
  connectionStatus: ConnectionStatus;
  onConnectToHost: (offer: string) => Promise<string | null>;
}

export default function ClientControls({ connectionStatus, onConnectToHost }: ClientControlsProps) {
  const [offerInput, setOfferInput] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleConnect = async () => {
    if (offerInput.trim()) {
      const answerData = await onConnectToHost(offerInput.trim());
      if (answerData) {
        setAnswer(answerData);
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-6">Client Controls</h3>
      
      <div className="space-y-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={offerInput}
            onChange={(e) => setOfferInput((e.target as HTMLInputElement).value)}
            placeholder="Paste host's offer here..."
            className="flex-1 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400"
          />
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect
          </button>
        </div>

        <div
          className={`p-3 rounded-lg text-center font-medium ${
            connectionStatus.connected
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}
        >
          {connectionStatus.message}
        </div>

        {answer && (
          <div>
            <label htmlFor="answer-display" className="block text-gray-300 mb-2">
              Send this answer back to the host:
            </label>
            <textarea
              id="answer-display"
              value={answer}
              readOnly
              placeholder="Answer will appear here..."
              className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-y"
            />
          </div>
        )}
      </div>
    </div>
  );
}