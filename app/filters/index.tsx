import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { useState } from 'react';

export default function FiltersScreen() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const brands = ['Ray-Ban', 'Oakley', 'Gucci', 'Prada'];
  const features = ['Polarized', 'UV Protection', 'Anti-Scratch', 'Lightweight'];

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleApply = () => {
    router.back();
  };

  const handleReset = () => {
    setPriceRange([0, 200]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.priceDisplay}>
          <Text style={styles.priceText}>${priceRange[0]} - ${priceRange[1]}</Text>
        </View>
        <View style={styles.rangeButtons}>
          <Pressable
            style={styles.rangeButton}
            onPress={() => setPriceRange([0, 50])}
          >
            <Text style={styles.rangeButtonText}>Under $50</Text>
          </Pressable>
          <Pressable
            style={styles.rangeButton}
            onPress={() => setPriceRange([50, 100])}
          >
            <Text style={styles.rangeButtonText}>$50 - $100</Text>
          </Pressable>
          <Pressable
            style={styles.rangeButton}
            onPress={() => setPriceRange([100, 200])}
          >
            <Text style={styles.rangeButtonText}>$100+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brands</Text>
        {brands.map((brand) => (
          <Pressable
            key={brand}
            style={[
              styles.checkbox,
              selectedBrands.includes(brand) && styles.checkboxChecked,
            ]}
            onPress={() => toggleBrand(brand)}
          >
            <View style={styles.checkboxBox}>
              {selectedBrands.includes(brand) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>{brand}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        {features.map((feature) => (
          <Pressable
            key={feature}
            style={[
              styles.checkbox,
              selectedFeatures.includes(feature) && styles.checkboxChecked,
            ]}
            onPress={() => toggleFeature(feature)}
          >
            <View style={styles.checkboxBox}>
              {selectedFeatures.includes(feature) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>{feature}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleApply}
          style={styles.applyButton}
        >
          <ButtonText>Apply Filters</ButtonText>
        </Button>
        <Button
          variant="outline"
          onPress={handleReset}
          style={styles.resetButton}
        >
          <ButtonText>Reset</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  priceDisplay: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  rangeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rangeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  rangeButtonText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  checkboxChecked: {
    backgroundColor: '#f0f7ff',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  applyButton: {
    width: '100%',
  },
  resetButton: {
    width: '100%',
  },
});
