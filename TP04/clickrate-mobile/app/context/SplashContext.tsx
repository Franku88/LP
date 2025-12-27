import { createContext, useContext, useState } from "react";

type SplashContextType = {
  mostrarSplash: boolean;
  ocultarSplash: () => void;
};

const SplashContext = createContext<SplashContextType | null>(null);

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  const ocultarSplash = () => setMostrarSplash(false);

  return (
    <SplashContext.Provider value={{ mostrarSplash, ocultarSplash }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash debe usarse dentro de SplashProvider");
  }
  return context;
}