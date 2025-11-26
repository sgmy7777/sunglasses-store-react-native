import { router } from 'expo-router';
import { FlatList, StyleSheet, View, Pressable, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {CartItem, removeFromCart, updateQuantity} from '@/store/cartSlice';
import { Image } from 'expo-image';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.product.price.value * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      Alert.alert('Confirm', 'Remove this item from cart?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => dispatch(removeFromCart(productId)),
          style: 'destructive',
        },
      ]);
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checking out');
      return;
    }
    router.navigate('/checkout');
  };

  const renderCartItem = ({ item } : {item : CartItem}) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        {item.product.image ? (
          <Image
              source={typeof item.product.image === 'string' ? { uri: item.product.image } : item.product.image}
            style={styles.productImage}
            placeholder="PLACEHOLDER"
          />
        ) : (
          <View style={[styles.productImage, styles.placeholder]}>
            <Text style={styles.placeholderText}>No image</Text>
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.product.info.brand}</Text>
        <Text style={styles.itemName} numberOfLines={2}>{item.product.info.name}</Text>
        <Text style={styles.itemPrice}>${item.product.price.value.toFixed(2)}</Text>
      </View>

      <View style={styles.quantitySection}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </Pressable>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <Pressable
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </Pressable>

        <Pressable
          style={styles.removeButton}
          onPress={() => handleRemove(item.product.id)}
        >
          <Text style={styles.removeButtonText}>✕</Text>
        </Pressable>
      </View>

      <Text style={styles.itemTotal}>
        ${(item.product.price.value * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some sunglasses to get started!</Text>
        <Button
          onPress={() => router.navigate('/(tabs)')}
          style={styles.continueButton}
        >
          <ButtonText>Continue Shopping</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Button
          onPress={handleCheckout}
          style={styles.checkoutButton}
        >
          <ButtonText>Proceed to Checkout</ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  continueButton: {
    width: '100%',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#999',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 10,
    color: '#999',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemBrand: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    width: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    width: 60,
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    width: '100%',
  },
});
