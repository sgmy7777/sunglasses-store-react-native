import { ScrollView, StyleSheet, View, Pressable, TextInput, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import { createOrder } from '@/store/orderSlice';
import { clearCart } from '@/store/cartSlice';
import { router } from 'expo-router';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit Card', description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', label: 'PayPal', description: 'Fast and secure' },
  { id: 'apple_pay', label: 'Apple Pay', description: 'Quick and easy' },
  { id: 'google_pay', label: 'Google Pay', description: 'Quick and easy' },
];

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.product.price.value * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No items in cart</Text>
        <Button onPress={() => router.navigate('/(tabs)')}>
          <ButtonText>Back to Shopping</ButtonText>
        </Button>
      </View>
    );
  }

  const handlePay = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your delivery address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      dispatch(createOrder({
        items: cartItems,
        total: total,
        paymentMethod: selectedPayment,
      }));
      dispatch(clearCart());
      setIsLoading(false);
      router.navigate('/order-accepted');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items:</Text>
            <Text style={styles.summaryValue}>{cartItems.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Delivery Address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentOptions}>
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.paymentOption,
                selectedPayment === method.id && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentRadio}>
                {selectedPayment === method.id && (
                  <View style={styles.paymentRadioDot} />
                )}
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentLabel}>{method.label}</Text>
                <Text style={styles.paymentDescription}>{method.description}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handlePay}
          disabled={isLoading}
          style={styles.payButton}
        >
          <ButtonText>{isLoading ? 'Processing...' : `Pay ${total.toFixed(2)}`}</ButtonText>
        </Button>
        <Button
          variant="outline"
          onPress={() => router.back()}
          disabled={isLoading}
          style={styles.cancelButton}
        >
          <ButtonText>Cancel</ButtonText>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#000',
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  paymentOptions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  paymentOptionSelected: {
    backgroundColor: '#f5f5f5',
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  paymentDescription: {
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  payButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
  },
});
