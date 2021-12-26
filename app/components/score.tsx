import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

const ProductScore = ({score}: any) => {
  // const [loading, setLoading] = useState(true);
  const [colour, setColour] = useState('grey');

  // const designateColour = useCallback(() => {

  //   console.log(loading);
  // }, [loading, score]);

  useEffect(() => {
    console.log('SCORE RENDER');
    if (score !== null) {
      let checkScore = parseFloat(score.sustainabilityScore);

      if (checkScore <= 2) {
        setColour('red');
      } else if (checkScore <= 4) {
        setColour('orange');
      } else if (checkScore === 5) {
        setColour('green');
      }
    }
  }, [score]);

  return (
    <View style={[styles.container, {backgroundColor: colour}]}>
      <Text style={styles.score}>
        {score ? score.sustainabilityScore : '?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 60 / 2,
    marginLeft: 'auto',
  },
  score: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
});

export default ProductScore;
