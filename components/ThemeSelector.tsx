import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Searchbar,
  Button,
  Portal,
  Modal,
  List,
  Divider,
  Badge,
  useTheme as usePaperTheme,
} from 'react-native-paper';
import { useTheme } from '@/providers/ThemeContext';
import { AnimeTheme } from '@/types/theme';

const { width } = Dimensions.get('window');

interface ThemeSelectorProps {
  visible: boolean;
  onDismiss: () => void;
  onThemeSelect?: (theme: AnimeTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  visible,
  onDismiss,
  onThemeSelect,
}) => {
  const {
    currentTheme,
    allThemes,
    themeSettings,
    setCurrentTheme,
    addToFavorites,
    removeFromFavorites,
    getThemesByCategory,
    searchThemes,
    getDailyThemes,
  } = useTheme();
  
  const paperTheme = usePaperTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter themes based on search and category
  const filteredThemes = useMemo(() => {
    let themes = allThemes;
    
    if (searchQuery) {
      themes = searchThemes(searchQuery);
    }
    
    if (selectedCategory) {
      themes = themes.filter(theme => theme.category === selectedCategory);
    }
    
    return themes;
  }, [allThemes, searchQuery, selectedCategory, searchThemes]);

  // Get daily themes
  const dailyThemes = useMemo(() => getDailyThemes(3), [getDailyThemes]);

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6B7280';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // Get rarity icon
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⭐';
      case 'rare': return '⭐⭐';
      case 'epic': return '⭐⭐⭐';
      case 'legendary': return '⭐⭐⭐⭐';
      default: return '⭐';
    }
  };

  const handleThemeSelect = async (theme: AnimeTheme) => {
    await setCurrentTheme(theme.id);
    onThemeSelect?.(theme);
    onDismiss();
  };

  const handleFavoriteToggle = async (themeId: string) => {
    const isFavorite = themeSettings.favoriteThemes.includes(themeId);
    if (isFavorite) {
      await removeFromFavorites(themeId);
    } else {
      await addToFavorites(themeId);
    }
  };

  const renderThemeCard = ({ item: theme }: { item: AnimeTheme }) => {
    const isCurrentTheme = currentTheme?.id === theme.id;
    const isFavorite = themeSettings.favoriteThemes.includes(theme.id);
    const isUnlocked = themeSettings.unlockedThemes.includes(theme.id);

    return (
      <Card
        style={[
          styles.themeCard,
          viewMode === 'grid' ? styles.gridCard : styles.listCard,
          isCurrentTheme && { borderColor: theme.colors.primary, borderWidth: 2 },
        ]}
        onPress={() => isUnlocked && handleThemeSelect(theme)}
      >
        <Card.Cover
          source={theme.assets.previewImage || require('@/assets/icons/icon.png')}
          style={styles.themeImage}
        />
        
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Title style={[styles.themeTitle, { color: theme.colors.onSurface }]}>
              {theme.name}
            </Title>
            <TouchableOpacity
              onPress={() => handleFavoriteToggle(theme.id)}
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteIcon}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Paragraph style={[styles.themeDescription, { color: theme.colors.onSurfaceVariant }]}>
            {theme.description}
          </Paragraph>
          
          <View style={styles.themeMeta}>
            {theme.series && (
              <Chip
                mode="outlined"
                style={[styles.chip, { borderColor: theme.colors.outline }]}
                textStyle={{ color: theme.colors.onSurfaceVariant }}
              >
                {theme.series}
              </Chip>
            )}
            
            <Chip
              mode="outlined"
              style={[
                styles.chip,
                { borderColor: getRarityColor(theme.rarity) }
              ]}
              textStyle={{ color: getRarityColor(theme.rarity) }}
            >
              {getRarityIcon(theme.rarity)} {theme.rarity}
            </Chip>
          </View>
          
          {!isUnlocked && (
            <View style={styles.lockedOverlay}>
              <Text style={styles.lockedText}>🔒 Locked</Text>
            </View>
          )}
          
          {isCurrentTheme && (
            <Badge style={[styles.currentBadge, { backgroundColor: theme.colors.primary }]}>
              Current
            </Badge>
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderCategoryChip = ({ item: category }: { item: any }) => (
    <Chip
      mode={selectedCategory === category.id ? 'flat' : 'outlined'}
      selected={selectedCategory === category.id}
      onPress={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
      style={styles.categoryChip}
    >
      {category.icon} {category.name}
    </Chip>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          { backgroundColor: paperTheme.colors.background }
        ]}
      >
        <View style={styles.header}>
          <Title style={[styles.modalTitle, { color: paperTheme.colors.onBackground }]}>
            Choose Your Theme
          </Title>
          <Button onPress={onDismiss}>Close</Button>
        </View>

        <Searchbar
          placeholder="Search themes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.viewModeToggle}>
          <Button
            mode={viewMode === 'grid' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('grid')}
            style={styles.viewModeButton}
          >
            Grid
          </Button>
          <Button
            mode={viewMode === 'list' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('list')}
            style={styles.viewModeButton}
          >
            List
          </Button>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <FlatList
            data={themeSettings.themeCategories}
            renderItem={renderCategoryChip}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>

        {!searchQuery && !selectedCategory && (
          <View style={styles.dailySection}>
            <Title style={[styles.sectionTitle, { color: paperTheme.colors.onBackground }]}>
              Daily Picks
            </Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dailyThemes.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  style={styles.dailyCard}
                  onPress={() => handleThemeSelect(theme)}
                >
                  <Image
                    source={theme.assets.previewImage || require('@/assets/icons/icon.png')}
                    style={styles.dailyImage}
                  />
                  <Text style={[styles.dailyTitle, { color: paperTheme.colors.onBackground }]}>
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <FlatList
          data={filteredThemes}
          renderItem={renderThemeCard}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.themesList}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchbar: {
    marginBottom: 16,
  },
  viewModeToggle: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  viewModeButton: {
    marginRight: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  dailySection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dailyCard: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
  },
  dailyImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  dailyTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  themesList: {
    paddingBottom: 20,
  },
  themeCard: {
    marginBottom: 12,
    elevation: 2,
  },
  gridCard: {
    width: (width - 60) / 2,
    marginRight: 8,
  },
  listCard: {
    width: '100%',
  },
  themeImage: {
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  themeDescription: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  themeMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  lockedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  currentBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default ThemeSelector; 