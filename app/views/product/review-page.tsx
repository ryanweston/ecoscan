import React, {useState} from 'react';
import {Container, Headline} from '../../components';
import {
  Text,
  Button,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {request} from '../../request';

const ReviewPage = ({route}: any) => {
  const [sustainability, setSustainability] = useState(0);
  const [quality, setQuality] = useState(0);
  const {barcode} = route.params;

  let alert = '';

  const options = [0, 1, 2, 3, 4, 5];

  const checkReview = () => {
    if (!quality && !sustainability) {
      alert = 'Please add all scores';
      return;
    } else if (!(quality <= 5) || !(sustainability <= 5)) {
      alert = 'Review failed';
      return;
    }
    postReview();
  };

  const postReview = async () => {
    try {
      const body = {sustainability, quality, barcode};
      console.log('BODY', body);
      const response = request.post('/reviews', body);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
    <Container>
      <Headline>Add a review</Headline>
      <Text style={{marginTop: 10}}>Sustainability</Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {options.map((item, index) => {
          let selected = !!(sustainability === item);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setScore(item, 'sustainability');
              }}>
              <Text
                style={[
                  styles.input,
                  selected ? styles.selected : styles.unselected,
                ]}>
                {item}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>

      <Text style={{marginTop: 10}}>Quality</Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {options.map((item, index) => {
          let selected = !!(quality === item);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setScore(item, 'quality');
              }}>
              <Text
                style={[
                  styles.input,
                  selected ? styles.selected : styles.unselected,
                ]}>
                {item}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>

      <Button
        title="Add review"
        onPress={() => {
          checkReview();
        }}
      />
      {alert ? <Text>{alert}</Text> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
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

export default ReviewPage;
