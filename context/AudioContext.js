import { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioUrls, setAudioUrls] = useState([]);

  return (
    <AudioContext.Provider value={{ audioUrls, setAudioUrls }}>
      {children}
    </AudioContext.Provider>
  );
};
