import React from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Title, ProductScore, Button, Tooltip,
} from '@/components';
import { withTheme } from '@/theme/theme-context';
import ScoreItem from './components/score-item';
import {
  ITheme, IProduct, IThemeProp, HomeStackParamList, ScanStackParamList,
} from '@/types';

type ModalScreenNavigationProp = NativeStackScreenProps<HomeStackParamList | ScanStackParamList>

interface Props {
  product: IProduct,
  navigation: ModalScreenNavigationProp['navigation'],
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
    paddingBottom: theme.tokens.gap,
  },
  progressContainer: {
    paddingTop: 30,
    paddingBottom: 35,
  },
  noScoresContainer: {
    backgroundColor: theme.colors.greys.background,
    borderRadius: theme.tokens.borderRadius,
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
          <Title style={styles.nameText}>
            {product.productName}
          </Title>

          { product.brand ? (
            <Text style={styles.nameText}>
              {product.brand.name}
            </Text>
          ) : null }

        </View>
        <Tooltip action={() => {
          closeModal();
          navigation.navigate('Information');
        }}
        />
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
          <View style={[styles.noScoresContainer, { marginTop: theme.tokens.gap }]}>
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
      <Title>Sorry, we couldn&lsquo;t find this item.</Title>
    </View>
  );
}
export default withTheme(ProductPage);
