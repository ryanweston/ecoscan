import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, ScrollView, Pressable,
} from 'react-native';

// @ts-ignore
// import ProgressBar from 'react-native-progress/Bar';
import {
  Headline, ProductScore, Button, Subtitle,
} from '@/components';
import { withTheme } from '@/styles/theme-context';
import ScoreItem from './components/score-item';

const styles = StyleSheet.create({
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
    backgroundColor: '#EDEDED',
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
  product, navigation, setBarcode,
}: any) {
  return product ? (
    <ScrollView>
      <View style={styles.scoreContainer}>
        <ProductScore score={product.reviewAggregate} large />
      </View>
      <View style={styles.nameContainer}>
        <View style={{ flex: 1 }}>
          <Headline propStyles={styles.nameText}>{product.productName}</Headline>
          <Text style={styles.nameText}>{product.brand.name}</Text>
        </View>
        <Pressable onPress={() => {
          setBarcode('');
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

        { product.brand.sustainabilityScore !== 'NaN' ? (
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
          setBarcode('');
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
