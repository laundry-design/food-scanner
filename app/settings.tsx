import { useSettings } from "@/providers/SettingsContext";
import { useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  useTheme as usePaperTheme,
  Button,
  TextInput,
  Snackbar,
  Portal,
  Card,
  Title,
  Paragraph,
  Switch,
  List,
  Divider,
  Chip,
  Badge,
} from "react-native-paper";
import ThemeSelector from "@/components/ThemeSelector";

export default function SettingsScreen() {
  const { API_KEY, geminiModel, updateAPIKey, updateGeminiModel } = useSettings();
  const {
    currentTheme,
    themeSettings,
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    setAutoTheme,
    unlockTheme,
    getThemeStats,
  } = useTheme();
  
  const paperTheme = usePaperTheme();
  const [key, setKey] = useState(API_KEY || "");
  const [model, setGeminiModel] = useState("");
  const [visible, setVisible] = useState(false);
  const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);

  useEffect(() => {
    setKey(API_KEY || "");
    setGeminiModel(geminiModel || "");
  }, [API_KEY, geminiModel]);

  const saveKey = async () => {
    updateAPIKey(key);
    updateGeminiModel(model);
    setVisible(true);
  };

  const handleThemeSelect = (theme: any) => {
    console.log('Selected theme:', theme.name);
  };

  const themeStats = getThemeStats();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: paperTheme.colors.background }]}
    >
      {/* API Settings Section */}
      <Card style={styles.section}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
            API Configuration
          </Title>
          <TextInput
            label="Gemini API Key"
            value={key}
            onChangeText={setKey}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            label="Gemini model name"
            value={model}
            onChangeText={setGeminiModel}
            style={styles.input}
          />
          <Button mode="contained" onPress={saveKey} style={styles.button}>
            Save API Settings
          </Button>
        </Card.Content>
      </Card>

      {/* Theme Settings Section */}
      <Card style={styles.section}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
            Theme Settings
          </Title>
          
          {/* Current Theme Display */}
          <Card style={styles.currentThemeCard}>
            <Card.Cover
              source={currentTheme?.assets.previewImage || require('@/assets/icons/icon.png')}
              style={styles.themePreview}
            />
            <Card.Content>
              <Title style={[styles.themeName, { color: paperTheme.colors.onBackground }]}>
                {currentTheme?.name || 'Default Theme'}
              </Title>
              <Paragraph style={[styles.themeDescription, { color: paperTheme.colors.onSurfaceVariant }]}>
                {currentTheme?.description || 'Default theme for the app'}
              </Paragraph>
              <View style={styles.themeMeta}>
                {currentTheme?.series && (
                  <Chip mode="outlined" style={styles.chip}>
                    {currentTheme.series}
                  </Chip>
                )}
                <Chip mode="outlined" style={styles.chip}>
                  {currentTheme?.rarity || 'common'}
                </Chip>
              </View>
            </Card.Content>
          </Card>

          <Button
            mode="outlined"
            onPress={() => setThemeSelectorVisible(true)}
            style={styles.button}
          >
            Change Theme
          </Button>
        </Card.Content>
      </Card>

      {/* Appearance Settings */}
      <Card style={styles.section}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
            Appearance
          </Title>
          
          <List.Item
            title="Dark Mode"
            description="Switch between light and dark themes"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Auto Theme"
            description="Automatically switch themes based on time"
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
            right={() => (
              <Switch
                value={themeSettings.autoTheme}
                onValueChange={setAutoTheme}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Theme Statistics */}
      <Card style={styles.section}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
            Theme Statistics
          </Title>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title style={[styles.statNumber, { color: paperTheme.colors.primary }]}>
                {themeStats.total}
              </Title>
              <Paragraph style={[styles.statLabel, { color: paperTheme.colors.onSurfaceVariant }]}>
                Total Themes
              </Paragraph>
            </View>
            
            <View style={styles.statItem}>
              <Title style={[styles.statNumber, { color: paperTheme.colors.secondary }]}>
                {themeSettings.unlockedThemes.length}
              </Title>
              <Paragraph style={[styles.statLabel, { color: paperTheme.colors.onSurfaceVariant }]}>
                Unlocked
              </Paragraph>
            </View>
            
            <View style={styles.statItem}>
              <Title style={[styles.statNumber, { color: paperTheme.colors.tertiary }]}>
                {themeSettings.favoriteThemes.length}
              </Title>
              <Paragraph style={[styles.statLabel, { color: paperTheme.colors.onSurfaceVariant }]}>
                Favorites
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Theme Categories */}
      <Card style={styles.section}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
            Theme Categories
          </Title>
          
          {themeSettings.themeCategories.map((category) => (
            <List.Item
              key={category.id}
              title={category.name}
              description={`${category.themes.length} themes`}
              left={(props) => <List.Icon {...props} icon="folder" />}
              right={() => (
                <Badge>{category.themes.length}</Badge>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Snackbar for API settings */}
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

      {/* Theme Selector Modal */}
      <ThemeSelector
        visible={themeSelectorVisible}
        onDismiss={() => setThemeSelectorVisible(false)}
        onThemeSelect={handleThemeSelect}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  currentThemeCard: {
    marginBottom: 16,
  },
  themePreview: {
    height: 120,
  },
  themeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  themeDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  themeMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  snackbar: {
    margin: 32,
  },
});
