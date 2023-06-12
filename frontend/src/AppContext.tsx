import { createContext, useState } from "react";
import { AppContextProps, AppProviderProps } from "./types";

const defaultValue: AppContextProps = {
  inputValue: '',
  handleChange: () => {}
}
export const AppContext = createContext<AppContextProps>(defaultValue);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (value: string) => {
    setInputValue(value);
  }

  const contextValue: AppContextProps = {
    inputValue,
    handleChange
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
