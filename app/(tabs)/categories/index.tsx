import ProductsContext from '@/app/types/product';
import { useContext } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

export default function CategoriesScreen() {
  const products = useContext(ProductsContext);

  const brands = Object.entries(
    products.reduce((acc, product) => {
      if (product.info.brand in acc) {
        return acc;
      }
      return {
        ...acc,
        [product.info.brand]: products.filter(p => p.info.brand === product.info.brand).length,
      };
    }, {} as Record<string, number>)
  );

  const renderBrand = ({ item: [brand, count] }: { item: [string, number] }) => (
    <Pressable style={styles.brandCard}>
      <Text style={styles.brandName}>{brand}</Text>
      <Text style={styles.productCount}>{count} product{count !== 1 ? 's' : ''}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Brands</Text>
      </View>
      <FlatList
        data={brands}
        renderItem={renderBrand}
        keyExtractor={([brand]) => `brand-${brand.replaceAll(" ", "-").toLowerCase()}`}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    paddingVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  brandCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  productCount: {
    fontSize: 12,
    color: '#999',
  },
});
