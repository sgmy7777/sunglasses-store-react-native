import { Button, ButtonText } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import ProductsContext from "@/app/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Image } from "expo-image";

export default function ProductScreen() {
  const [isAddedToCart, setAddedToCart] = useState(false);
  const { productId } = useLocalSearchParams();
  const products = useContext(ProductsContext);
  const dispatch = useDispatch();
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
              source={typeof product.image === 'string' ? { uri: product.image } : product.image}
            style={styles.image}
            placeholder="PLACEHOLDER"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No image available</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>{product.info.brand}</Text>
        <Text style={styles.name}>{product.info.name}</Text>
        
        <View style={styles.priceSection}>
          <Text style={styles.price}>${product.price.value.toFixed(2)}</Text>
          {product.deliveryType === 'free' && (
            <Text style={styles.freeDelivery}>Free delivery</Text>
          )}
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingValue}>★ {product.rating.value}</Text>
          <Text style={styles.reviewsCount}>({product.rating.reviewsAmount} reviews)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tagline</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Material</Text>
          <View style={styles.tagsContainer}>
            {product.info.material.map((material, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{material}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.tagsContainer}>
            {product.info.features.map((feature, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isAddedToCart ? (
            <>
              <Button 
                variant="outline" 
                action="negative" 
                onPress={() => setAddedToCart(false)}
                style={styles.button}
              >
                <ButtonText>Remove from Cart</ButtonText>
              </Button>
              <Button 
                onPress={() => router.navigate("/(tabs)/cart")}
                style={styles.button}
              >
                <ButtonText>Go to Cart</ButtonText>
              </Button>
            </>
          ) : (
            <Button 
              variant="solid" 
              action="primary" 
              onPress={handleAddToCart}
              style={styles.button}
            >
              <ButtonText>Add to Bag</ButtonText>
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
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
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
  },
  brand: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  priceSection: {
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  freeDelivery: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  tagline: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 8,
  },
  button: {
    width: '100%',
  },
});
