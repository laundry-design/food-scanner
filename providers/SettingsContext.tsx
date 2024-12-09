import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextProps {
  API_KEY: string | null;
  updateAPIKey: (key: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [API_KEY, setAPI_KEY] = useState<string | null>(null);

  const getAPI_KEY = async () => {
    const key = await AsyncStorage.getItem("API_KEY");
    setAPI_KEY(key);
  };

  const updateAPIKey = async (key: string) => {
    await AsyncStorage.setItem("API_KEY", key);
    setAPI_KEY(key);
  };

  useEffect(() => {
    getAPI_KEY();
  }, []);

  return (
    <SettingsContext.Provider value={{ API_KEY, updateAPIKey }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
