import React from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';

// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {
  Headline, ProductScore, Button,
} from '@/components';
import { withTheme } from '@/styles/theme-context';

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
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  progressContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  progressWrapper: {
    marginLeft: 'auto',
  },
});

function ProductPage({
  product, navigation, theme, setBarcode,
}: any) {
  return product ? (
    <ScrollView>
      <View style={styles.scoreContainer}>
        <ProductScore score={product.reviewAggregate} large />
      </View>
      <Headline>{product.productName}</Headline>
      <Text>{product.brand.name}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.listItem}>
          <Text>Impact:</Text>
          <View style={styles.progressWrapper}>
            <ProgressBar
              progress={0.3}
              width={250}
              height={20}
              borderRadius={40}
              unfilledColor="#DDD"
              borderWidth={0}
              color={theme.currentTheme.primary}
            />
          </View>
        </View>
        <View style={styles.listItem}>
          <Text>Quality:</Text>
          <View style={styles.progressWrapper}>
            <ProgressBar
              progress={0.3}
              width={250}
              height={20}
              borderRadius={40}
              unfilledColor="#DDD"
              borderWidth={0}
              color={theme.currentTheme.primary}
            />
          </View>
        </View>
        <View style={styles.listItem}>
          <Text>Brand:</Text>
          <View style={styles.progressWrapper}>
            <ProgressBar
              progress={0.3}
              width={250}
              height={20}
              borderRadius={40}
              unfilledColor="#DDD"
              borderWidth={0}
              color={theme.currentTheme.primary}
            />
          </View>
        </View>
      </View>

      <Button
        text="Add a review"
        action={() => {
          setBarcode('');
          navigation.navigate('Review', { barcode: product.barcode });
        }}
      />

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
export default withTheme(ProductPage);
