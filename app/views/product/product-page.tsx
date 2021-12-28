import React from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';

// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {
  Headline, ProductScore, Button,
} from '@/components';

const styles = StyleSheet.create({
  scoreContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
  listItem: {
    marginTop: 40,
    marginBottom: 40,
    width: '100%',
    flexDirection: 'row',
  },
});

// interface Product {
//   productName: string;
//   brandName: string;
//   brandRating: number;
//   productRating: number;
//   productQuality: number;
//   totalScore: number;
// }

function ProductPage({ product, setBarcode }: any) {
  return product ? (
    <ScrollView>
      <View style={styles.scoreContainer}>
        <ProductScore score={product.reviewAggregate} large />
      </View>
      <Headline>{product.productName}</Headline>
      <Text>{product.brand.name}</Text>
      <View style={styles.listItem}>
        <Text>Sustainability:</Text>
        <ProgressBar
          progress={0.3}
          width={200}
          height={15}
          borderRadius={40}
          unfilledColor="#DDD"
          borderWidth={0}
          color="green"
        />
      </View>

      <Button text="Add a review" action={setBarcode} />

    </ScrollView>
  ) : (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Headline>Sorry, we couldn&lsquo;t find this item.</Headline>
    </View>
  );
}
export default ProductPage;
