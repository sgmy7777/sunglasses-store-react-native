import '@/global.css';

import ProductsContext, { defaultProducts } from "@/app/types/product";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function RootLayout() {
  return <Provider store={store}>
    <GluestackUIProvider>
      <ProductsContext.Provider value={defaultProducts}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Back", }} />
          <Stack.Screen name="filters/index" options={{ title: "Filters", }} />
          <Stack.Screen name="product/[productId]" options={{ title: "Product", }} />
          <Stack.Screen name="checkout/index" options={{ title: "Checkout", }} />
          <Stack.Screen name="order-accepted/index" options={{ title: "Order Accepted", }} />
        </Stack>
      </ProductsContext.Provider>
    </GluestackUIProvider>
  </Provider>;
}
