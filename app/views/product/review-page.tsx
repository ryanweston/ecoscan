import React, { useState } from 'react';
import {
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Container, Headline, Button } from '@/components';
import { request } from '@/request';

const banner = require('@/styles/CLIP.png');

const styles = StyleSheet.create({
  input: {
    fontSize: 35,
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 3,
    borderColor: 'green',
  },
  unselected: {},
});

function ReviewPage({ route, navigation }: any) {
  const [sustainability, setSustainability] = useState(0);
  const [quality, setQuality] = useState(0);
  const { barcode } = route.params;

  let alert = '';

  const options = [0, 1, 2, 3, 4, 5];

  const postReview = async () => {
    const body = { sustainability, quality, barcode };
    await request.post('/reviews', body);
    navigation.navigate('Home');
  };

  const checkReview = () => {
    if (!quality && !sustainability) {
      alert = 'Please add all scores';
      return;
    } if (!(quality <= 5) || !(sustainability <= 5)) {
      alert = 'Review failed';
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
      <Container>
        <Headline>Add a review</Headline>
      </Container>
      <Image
        style={{
          width: '100%', height: 75, margin: 0,
        }}
        source={banner}
      />
      <Container background>
        <Headline propStyles={{ color: 'white' }}>Sustainability</Headline>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {options.map((item) => {
            const selected = !!(sustainability === item);
            return (
              <TouchableWithoutFeedback
                key={item}
                onPress={() => {
                  setScore(item, 'sustainability');
                }}
              >
                <Text
                  style={[
                    styles.input,
                    selected ? styles.selected : styles.unselected,
                    { color: 'white' },
                  ]}
                >
                  {item}
                </Text>
              </TouchableWithoutFeedback>
            );
          })}
        </View>

        <Headline propStyles={{ color: 'white' }}>Quality</Headline>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {options.map((item) => {
            const selected = !!(quality === item);
            return (
              <TouchableWithoutFeedback
                key={item}
                onPress={() => {
                  setScore(item, 'quality');
                }}
              >
                <Text
                  style={[
                    styles.input,
                    selected ? styles.selected : styles.unselected,
                    { color: 'white' },
                  ]}
                >
                  {item}
                </Text>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </Container>
      <Image
        style={{
          width: '100%', height: 60, margin: 0, transform: [{ rotate: '180deg' }],
        }}
        source={banner}
      />

      <Button
        text="Add review"
        action={checkReview()}
      />
      {alert ? <Text>{alert}</Text> : null}
    </ScrollView>
  );
}

export default ReviewPage;
