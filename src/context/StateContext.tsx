import { useContext, createContext, useState, ReactNode } from "react";

interface StateContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  return (
    <StateContext.Provider
      value={{
        theme, setTheme
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateContextProvider");
  }
  return context;
};
