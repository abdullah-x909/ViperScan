import { createContext } from 'react';

type AppContextType = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  interceptActive: boolean;
  setInterceptActive: (active: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  darkMode: true,
  setDarkMode: () => {},
  interceptActive: false,
  setInterceptActive: () => {},
});