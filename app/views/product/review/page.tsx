import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Container, Headline, Button, CurveContainer, ProductScore,
} from '@/components';
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';
import ScoreItem from './components/score-item';
import ReviewSuccess from './components/review-success';

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'green',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  scoreRow: {
    marginBottom: 30,
  },
});

function ReviewPage({ route, navigation, theme }: any) {
  const [sustainability, setSustainability] = useState(3);
  const [quality, setQuality] = useState(3);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState(false);

  const { product } = route.params;
  const { barcode } = product;

  const postReview = async () => {
    const body = { sustainability, quality, barcode };
    await request.post('/reviews', body);
    setSuccess(true);
  };

  const checkReview = () => {
    if (!quality && !sustainability) {
      setAlert('Both scores are required');
      return;
    } if (!(quality <= 5) || !(sustainability <= 5)) {
      setAlert('Review failed');
      return;
    }
    postReview();
  };

  const setScore = (score: number, scope: string) => {
    if (scope === 'sustainability') {
      setSustainability(score);
    }

    if (scope === 'quality') {
      setQuality(score);
    }
  };

  return (
    <ScrollView>
      {alert ? (
        <View style={[styles.alertContainer, { backgroundColor: theme.currentTheme.grey }]}>
          <Text>{alert}</Text>
        </View>
      ) : null }
      <Container>
        <View style={styles.productContainer}>
          <View style={{ flex: 1 }}>
            <Headline propStyles={styles.productText}>{ product.productName }</Headline>
            <Text style={styles.productText}>{ product.brand.name }</Text>
          </View>
          <ProductScore medium score={product.reviewAggregate} />
        </View>
      </Container>

      <CurveContainer topRound bottomRound>
        <View style={styles.scoreRow}>
          <Headline propStyles={{ color: 'white', fontSize: 18 }}>1. Ease of disposal</Headline>
          <ScoreItem action={(score: number) => { setScore(score, 'sustainability'); }} score={sustainability} />
        </View>

        <View style={styles.scoreRow}>
          <Headline propStyles={{ color: 'white', fontSize: 18 }}>2. Quality of product</Headline>
          <ScoreItem action={(score: number) => { setScore(score, 'quality'); }} score={quality} />
        </View>

        <Button
          text="Add review"
          action={() => checkReview()}
        />
      </CurveContainer>

      <ReviewSuccess isVisible={success} navigation={navigation} />
    </ScrollView>
  );
}

export default withTheme(ReviewPage);
