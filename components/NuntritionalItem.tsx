import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

interface NutritionalItemProps {
  name?: string;
  value: string;
  icon: string;
  color: string;
}

export const NutritionalItem: React.FC<NutritionalItemProps> = ({
  name,
  value,
  icon,
  color,
}) => {
  const theme = useTheme();

  return (
    <Card
      style={[styles.nutritionCard, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.iconText}>
        <Icon source={icon} color={color} size={24} />
        <View
          style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}
        >
          <Text variant="labelMedium" style={{ opacity: 0.5 }}>
            {name}
          </Text>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {value}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  nutritionCard: {
    marginHorizontal: 4,
    padding: 16,
    width: "45%",
    borderRadius: 8,
    marginVertical: 5,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  nutritionText: {
    fontSize: 16,
  },
});
