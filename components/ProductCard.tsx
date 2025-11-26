import { Product } from '@/app/types/product';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handlePress = () => {
    router.navigate(`/product/${product.id}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
              source={product.image}
              style={styles.image}
              placeholder="PLACEHOLDER"
              contentFit="cover"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No image</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.brand}>{product.info.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.info.name}</Text>
        <View style={styles.priceRating}>
          <Text style={styles.price}>${product.price.value.toFixed(2)}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingValue}>★ {product.rating.value}</Text>
            <Text style={styles.reviewsCount}>({product.rating.reviewsAmount})</Text>
          </View>
        </View>
        {product.deliveryType === 'free' && (
          <Text style={styles.freeDelivery}>Free delivery</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    marginHorizontal: 8,
    elevation: 2,
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    width: '100%',
    height: 170,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceRating: {
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 12,
    color: '#666',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
  },
  freeDelivery: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
});
