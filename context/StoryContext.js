import { createContext, useState } from 'react';

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [storyDescription, setStoryDescription] = useState("");

  return (
    <StoryContext.Provider value={{ storyDescription, setStoryDescription }}>
      {children}
    </StoryContext.Provider>
  );
};
