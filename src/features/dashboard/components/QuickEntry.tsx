import React, { useState } from 'react';
import { Plus, Mic, Camera } from 'lucide-react';
import { useVoiceInput } from '../../../hooks/useVoiceInput';
import { useCameraInput } from '../../../hooks/useCameraInput';

export const QuickEntry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startVoiceInput, isListening } = useVoiceInput();
  const { startCamera, isCapturing } = useCameraInput();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <Plus className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-2">
            <button
              onClick={() => startVoiceInput()}
              className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              disabled={isListening}
            >
              <Mic className="w-5 h-5 mr-3" />
              Voice Entry
            </button>
            
            <button
              onClick={() => startCamera()}
              className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              disabled={isCapturing}
            >
              <Camera className="w-5 h-5 mr-3" />
              Photo Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};