import { useSettings } from "@/providers/SettingsContext";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Button,
  TextInput,
  Snackbar,
  Portal,
} from "react-native-paper";

export default function SettingsScreen() {
  const { API_KEY, updateAPIKey } = useSettings();
  const theme = useTheme();
  const [key, setKey] = useState(API_KEY || "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setKey(API_KEY || "");
  }, [API_KEY]);

  const saveKey = async () => {
    updateAPIKey(key);
    setVisible(true);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        label="Gemini API Key"
        value={key}
        onChangeText={setKey}
        style={styles.input}
      />
      <Button mode="contained" onPress={saveKey}>
        Save
      </Button>
      <Portal>
        <Snackbar
          style={styles.snackbar}
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          Settings saved
        </Snackbar>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  snackbar: {
    margin: 32,
  },
});
