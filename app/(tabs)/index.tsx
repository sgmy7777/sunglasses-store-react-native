import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import { useContext } from 'react';
import ProductsContext from '@/app/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const PromoImage = require('@/assets/images/image.png');

export default function Index() {
  const products = useContext(ProductsContext);

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <View style={styles.bannerContainer}>
        <Image 
          source={PromoImage} 
          style={styles.bannerImage}
          placeholder="PLACEHOLDER"
        />
      </View>

      <View style={styles.exclusiveOfferSection}>
        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>✨ Exclusive Offer</Text>
            <Pressable
                style={styles.filterButton}
                onPress={() => router.navigate('/filters')}
            >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M21 4H14M10 4H3M21 12H12M8 12H3M21 20H16M12 20H3M14 2V6M8 10V14M16 18V22"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerSection: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  filterButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  exclusiveOfferSection: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  offerBadge: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  offerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
