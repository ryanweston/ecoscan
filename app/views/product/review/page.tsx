import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  Container, Headline, Subtitle, CurveContainer, ProductScore,
  Button,
} from '@/components';
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';
import ScoreItem from './components/score-item';
import ReviewSuccess from './components/review-success';
import {
  HomeStackParamList, ITheme, IThemeProp, ScanStackParamList, TabParamList,
} from '@/types';

type ReviewScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList | ScanStackParamList, 'Review'>,
  BottomTabScreenProps<TabParamList>
>;

interface Props {
  route: ReviewScreenNavigationProp['route'],
  navigation: ReviewScreenNavigationProp['navigation'],
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  alertContainer: {
    backgroundColor: theme.colors.primary,
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

function ReviewPage({ route, navigation, themeProp }: Props) {
  const [sustainability, setSustainability] = useState(3);
  const [quality, setQuality] = useState(3);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState(false);

  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  const { product } = route.params;
  const { barcode } = product;

  const setModal = () => setSuccess(!success);

  const postReview = async () => {
    const body = { sustainability, quality, barcode };
    await request.post('/reviews', body);
    setModal();
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
        <View style={[
          styles.alertContainer,
          { backgroundColor: theme.colors.greys.background },
        ]}
        >
          <Text>{alert}</Text>
        </View>
      ) : null }

      <Container>
        <View style={styles.productContainer}>
          <View style={{ flex: 1 }}>
            <Headline style={styles.productText}>
              { product.productName }
            </Headline>
            { product.brand
              ? (
                <Text style={styles.productText}>
                  { product.brand.name }
                </Text>
              ) : null}
          </View>
          <ProductScore medium score={product.reviewAggregate} />
        </View>
      </Container>

      <CurveContainer topRound bottomRound>
        <View style={styles.scoreRow}>
          <Subtitle dark>1. Ease of disposal</Subtitle>
          <ScoreItem
            action={(score: number) => {
              setScore(score, 'sustainability');
            }}
            score={sustainability}
          />
        </View>

        <View style={styles.scoreRow}>
          <Subtitle dark>2. Quality of product</Subtitle>
          <ScoreItem
            action={(score: number) => {
              setScore(score, 'quality');
            }}
            score={quality}
          />
        </View>

        <Button
          text="Add review"
          action={() => checkReview()}
        />
      </CurveContainer>

      <ReviewSuccess isVisible={success} setModal={setModal} navigation={navigation} />
    </ScrollView>
  );
}

export default withTheme(ReviewPage);
