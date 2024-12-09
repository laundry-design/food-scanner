import { useCallback, useMemo } from "react";
import {
  GoogleGenerativeAI,
  GenerationConfig,
  SchemaType,
  Part,
} from "@google/generative-ai";
import { getPrompt } from "@/constants/Prompt";
import RNFS from "react-native-fs";
import { useSettings } from "@/providers/SettingsContext";

const convertImageToBase64 = async (imagePath: string) => {
  try {
    const base64 = await RNFS.readFile(imagePath, "base64");

    return base64;
  } catch (error) {
    console.error("Error converting image to base64:", error);

    return null;
  }
};

interface AiHook {
  postImage: (image: string) => Promise<FoodInformation>;
}

interface FoodInformation {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  name: string;
}

export const useAi = (): AiHook => {
  const { API_KEY } = useSettings();

  if (!API_KEY) {
    throw new Error(
      "API Key is missing. Please set the GEMINI_API_KEY environment variable."
    );
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig: GenerationConfig = useMemo(() => {
    return {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          calories: { type: SchemaType.NUMBER },
          proteins: { type: SchemaType.NUMBER },
          carbs: { type: SchemaType.NUMBER },
          fats: { type: SchemaType.NUMBER },
          name: { type: SchemaType.STRING },
        },
        required: ["calories", "proteins", "carbs", "fats", "name"],
      },
    };
  }, []);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

  const fileToGenerativePart = useCallback(
    async (path: string, mimeType: string): Promise<Part> => {
      try {
        const base64 = await convertImageToBase64(path);
        if (!base64) {
          throw new Error("Failed to convert image to base64.");
        }
        return {
          inlineData: {
            data: base64,
            mimeType,
          },
        };
      } catch (error) {
        console.error("Error reading file:", error);
        throw new Error("Failed to process the image file.");
      }
    },
    []
  );

  const postImage = useCallback(
    async (image: string): Promise<FoodInformation> => {
      try {
        const prompt = getPrompt("");
        const processedImage = await fileToGenerativePart(image, "image/jpeg");

        const result = await model.generateContent([prompt, processedImage]);
        if (!result.response) {
          throw new Error("No response received from the AI model.");
        }

        const text = result.response.text();
        const foodInformation = JSON.parse(text);

        return {
          calories: foodInformation.calories,
          protein: foodInformation.proteins,
          fat: foodInformation.fats,
          carbohydrates: foodInformation.carbs,
          name: foodInformation.name,
        };
      } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to retrieve food information.");
      }
    },
    [fileToGenerativePart]
  );

  return { postImage };
};
