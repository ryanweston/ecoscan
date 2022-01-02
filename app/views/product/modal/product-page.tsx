import React from 'react';
import {
  Text, View, StyleSheet, ScrollView, Pressable,
} from 'react-native';

import {
  Headline, ProductScore, Button,
} from '@/components';
import { withTheme } from '@/styles/theme-context';
import ScoreItem from './components/score-item';
import { ITheme, IProduct, IThemeProp } from '@/types';

interface Props {
  product: IProduct,
  navigation: object,
  // eslint-disable-next-line no-unused-vars
  closeModal(): void,
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  scoreContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
  progressContainer: {
    paddingTop: 35,
    paddingBottom: 35,
  },
  noScoresContainer: {
    backgroundColor: theme.colors.greys.background,
    // backgroundColor: '#EDEDED',
    borderRadius: 20,
    width: '100%',
    padding: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  tooltip: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderColor: '#CCC',
    borderWidth: 2,
    borderRadius: 40,
  },
});

function ProductPage({
  product, navigation, closeModal, themeProp,
}: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return product ? (
    <ScrollView>
      <View style={styles.scoreContainer}>
        <ProductScore score={product.reviewAggregate} large />
      </View>

      <View style={styles.nameContainer}>
        <View style={{ flex: 1 }}>
          <Headline style={styles.nameText}>
            {product.productName}
          </Headline>

          { product.brand ? (
            <Text style={styles.nameText}>
              {product.brand.name}
            </Text>
          ) : null }

        </View>

        <Pressable onPress={() => {
          closeModal();
          navigation.navigate('Information');
        }}
        >
          <View style={styles.tooltip}>
            <Text style={{ fontWeight: 'bold', color: '#CCC' }}>?</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.progressContainer}>
        { product.reviewAggregate
          ? (
            <View>
              <ScoreItem
                title="Impact"
                score={product.reviewAggregate.sustainabilityScore}
              />
              <ScoreItem
                title="Quality"
                score={product.reviewAggregate.qualityScore}
              />
            </View>
          ) : (
            <View style={styles.noScoresContainer}>
              <Text>No reviews</Text>
            </View>
          )}

        { product.brand && product.brand.sustainabilityScore !== 'NaN' ? (
          <View>
            <ScoreItem
              title="Brand"
              score={product.brand.sustainabilityScore}
            />
          </View>
        ) : (
          <View style={[styles.noScoresContainer, { marginTop: 20 }]}>
            <Text>We have yet to review this brand</Text>
          </View>
        )}
      </View>

      <Button
        text="Add a review"
        action={() => {
          closeModal();
          navigation.navigate('Review', { product });
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
