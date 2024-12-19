import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextProps {
  API_KEY: string | null;
  geminiModel: string | null;
  updateAPIKey: (key: string) => Promise<void>;
  updateGeminiModel: (model: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [API_KEY, setAPI_KEY] = useState<string | null>(null);
  const [geminiModel, setGeminiModel] = useState<string | null>(null);

  const getItem = useCallback(async (item: string) => {
    return await AsyncStorage.getItem(item);
  }, []);

  const setItem = useCallback(async (item: string, value: string) => {
    await AsyncStorage.setItem(item, value);
  }, []);

  const getAPI_KEY = async () => {
    const key = await getItem("API_KEY");
    setAPI_KEY(key);
  };

  const updateAPIKey = async (key: string) => {
    await setItem("API_KEY", key);
    setAPI_KEY(key);
  };

  const getGeminiModel = async () => {
    const model = await getItem("geminiModel");
    setGeminiModel(model);
  };

  const updateGeminiModel = async (model: string) => {
    await setItem("geminiModel", model);
    setGeminiModel(model);
  };

  useEffect(() => {
    getAPI_KEY();
    getGeminiModel();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ API_KEY, geminiModel, updateAPIKey, updateGeminiModel }}
    >
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
