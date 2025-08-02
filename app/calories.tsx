import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Text, useTheme, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useAi } from "../hooks/useAi";
import { NutritionalItem } from "../components/NuntritionalItem";

export default function CaloriesScreen() {
  const route = useRoute();
  const { imageUri } = route.params as { imageUri: string };
  const { postImage } = useAi();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [foodInfo, setFoodInfo] = useState<{
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchFoodInfo = async () => {
    try {
      console.log('Starting AI analysis for image:', imageUri);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - please try again')), 30000); // 30 seconds
      });
      
      const resultPromise = postImage(imageUri);
      const result = await Promise.race([resultPromise, timeoutPromise]) as {
        name: string;
        calories: number;
        protein: number;
        fat: number;
        carbohydrates: number;
      };
      
      console.log('AI analysis result:', result);
      setFoodInfo(result);
    } catch (err: any) {
      console.error('AI analysis error:', err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodInfo();
  }, [imageUri, postImage]);

  if (loading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator
          animating
          size="large"
          color={theme.colors.primary}
        />
        <Text
          style={[styles.loadingText, { color: theme.colors.onBackground }]}
        >
          Analyzing your image...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text variant="headlineMedium" style={{ color: theme.colors.error }}>
          Error
        </Text>
        <Text style={[styles.errorText, { color: theme.colors.onBackground }]}>
          {error}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            setError(null);
            setLoading(true);
            fetchFoodInfo();
          }}
          style={{ marginTop: 16 }}
        >
          Try Again
        </Button>
      </View>
    );
  }

  if (!foodInfo) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: imageUri }} style={styles.image} />
      </Card>
      <View style={styles.infoContainer}>
        <Text
          variant="headlineMedium"
          style={[styles.foodName, { color: theme.colors.onBackground }]}
        >
          {foodInfo.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <NutritionalItem
            name="Calories"
            value={`${foodInfo.calories} kcal`}
            icon="fire"
            color="#ff9500"
          />
          <NutritionalItem
            name="Proteins"
            value={`${foodInfo.protein} g`}
            icon="food-steak"
            color="#4cd964"
          />
          <NutritionalItem
            name="Fats"
            value={`${foodInfo.fat} g`}
            icon="oil"
            color="#007aff"
          />
          <NutritionalItem
            name="Carbs"
            value={`${foodInfo.carbohydrates} g`}
            icon="bread-slice"
            color="#f44336"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    marginBottom: 16,
  },
  image: {
    height: 300,
    borderRadius: 8,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  foodName: {
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  nutritionCard: {
    padding: 16,
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  nutritionText: {
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    textAlign: "center",
    marginTop: 8,
  },
});
