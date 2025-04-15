import { useState, useCallback } from 'react';

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      // Implementation will use Web Speech API
      // This is a placeholder for the actual implementation
      setTimeout(() => setIsListening(false), 2000);
    } else {
      alert('Voice input is not supported in this browser');
    }
  }, []);

  return { startVoiceInput, isListening };
}