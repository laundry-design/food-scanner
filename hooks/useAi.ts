import { useCallback, useMemo } from "react";
import {
  GoogleGenerativeAI,
  GenerationConfig,
  SchemaType,
  Part,
} from "@google/generative-ai";
import { getPrompt } from "@/constants/Prompt";
import { Platform } from "react-native";
import { useSettings } from "@/providers/SettingsContext";

// Conditionally import react-native-fs only on native platforms
let RNFS: any = null;
if (Platform.OS !== 'web') {
  RNFS = require("react-native-fs");
}

const convertImageToBase64 = async (imagePath: string) => {
  try {
    if (Platform.OS === 'web') {
      // Web-compatible image to base64 conversion
      // For web, we expect the imagePath to already be a base64 string or data URL
      if (imagePath.startsWith('data:')) {
        // Remove the data URL prefix to get just the base64 part
        return imagePath.split(',')[1];
      }
      return imagePath;
    } else {
      // Native platform - use react-native-fs
      const base64 = await RNFS.readFile(imagePath, "base64");
      return base64;
    }
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
  const { API_KEY, geminiModel } = useSettings();

  if (!API_KEY) {
    throw new Error("API Key is missing. Please set the KEY in the settings.");
  }

  if (!geminiModel) {
    throw new Error(
      "Gemini model name is missing. Please set the Gemini model name in the settings."
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
        console.log('Starting AI processing...');
        const prompt = getPrompt("");
        console.log('Prompt generated');
        
        const processedImage = await fileToGenerativePart(image, "image/jpeg");
        console.log('Image processed successfully');

        console.log('Calling Gemini API...');
        const result = await model.generateContent([prompt, processedImage]);
        console.log('Gemini API response received');
        
        if (!result.response) {
          throw new Error("No response received from the AI model.");
        }

        const text = result.response.text();
        console.log('Raw AI response:', text);
        
        const foodInformation = JSON.parse(text);
        console.log('Parsed food information:', foodInformation);

        return {
          calories: foodInformation.calories,
          protein: foodInformation.proteins,
          fat: foodInformation.fats,
          carbohydrates: foodInformation.carbs,
          name: foodInformation.name,
        };
      } catch (error) {
        console.error("Error generating content:", error);
        
        // Provide more specific error messages
        if (error instanceof Error) {
          if (error.message.includes('API Key')) {
            throw new Error("Invalid API Key. Please check your Gemini API key in settings.");
          } else if (error.message.includes('model')) {
            throw new Error("Invalid model name. Please check your Gemini model name in settings.");
          } else if (error.message.includes('base64')) {
            throw new Error("Failed to process the image. Please try a different image.");
          } else if (error.message.includes('JSON')) {
            throw new Error("AI response format error. Please try again.");
          } else {
            throw new Error(`AI processing failed: ${error.message}`);
          }
        }
        
        throw new Error("Failed to retrieve food information. Please check your API settings.");
      }
    },
    [fileToGenerativePart]
  );

  return { postImage };
};
