import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { router } from 'expo-router';

export default function OrderAcceptedScreen() {
  const currentOrder = useSelector((state: RootState) => state.order.currentOrder);

  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order information not found</Text>
        <Button onPress={() => router.navigate('/(tabs)')}>
          <ButtonText>Back to Home</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>Order Accepted!</Text>
        <Text style={styles.subtitle}>Thank you for your purchase</Text>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID:</Text>
            <Text style={styles.detailValue}>{currentOrder.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount:</Text>
            <Text style={styles.detailValue}>${currentOrder.total.toFixed(2)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Items:</Text>
            <Text style={styles.detailValue}>{currentOrder.items.length}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailValue}>
              {currentOrder.paymentMethod === 'card' && 'Credit Card'}
              {currentOrder.paymentMethod === 'paypal' && 'PayPal'}
              {currentOrder.paymentMethod === 'apple_pay' && 'Apple Pay'}
              {currentOrder.paymentMethod === 'google_pay' && 'Google Pay'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, styles.statusCompleted]}>
              {currentOrder.status === 'completed' ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        <View style={styles.message}>
          <Text style={styles.messageText}>
            Your order has been confirmed and will be processed shortly. You will receive a confirmation email with tracking information.
          </Text>
        </View>

        {currentOrder.items.length > 0 && (
          <View style={styles.itemsSection}>
            <Text style={styles.itemsTitle}>Order Items:</Text>
            {currentOrder.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.product.info.brand} - {item.product.info.name}
                </Text>
                <Text style={styles.itemQty}>×{item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ${(item.product.price.value * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => router.navigate('/(tabs)')}
          style={styles.button}
        >
          <ButtonText>Continue Shopping</ButtonText>
        </Button>
        <Button
          variant="outline"
          onPress={() => router.navigate('/(tabs)/cart')}
          style={styles.button}
        >
          <ButtonText>View Cart</ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  statusCompleted: {
    color: '#4CAF50',
  },
  message: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 13,
    color: '#2e7d32',
    lineHeight: 18,
    textAlign: 'center',
  },
  itemsSection: {
    width: '100%',
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  itemQty: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    width: 60,
    textAlign: 'right',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
