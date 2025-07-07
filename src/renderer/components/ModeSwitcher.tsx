import { h } from 'preact';
import { AppMode } from '../types';

interface ModeSwitcherProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export default function ModeSwitcher({ currentMode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex gap-3 mb-8 justify-center">
      <div data-testid="current-mode" className="sr-only">Current mode: {currentMode}</div>
      <button
        data-testid="host-mode-button"
        onClick={() => onModeChange('host')}
        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
          currentMode === 'host'
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
        }`}
      >
        Host
      </button>
      <button
        data-testid="client-mode-button"
        onClick={() => onModeChange('client')}
        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
          currentMode === 'client'
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
        }`}
      >
        Client
      </button>
    </div>
  );
}