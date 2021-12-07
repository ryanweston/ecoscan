import React from 'react';
import {Container, Headline} from '../../components';
import {Text, Button} from 'react-native';

const ReviewPage = () => {
  return (
    <Container>
      <Headline>Add a review</Headline>
      <Text>Add inputs here</Text>
      <Button
        title="Add review"
        onPress={() => {
          console.log('Review added');
        }}
      />
    </Container>
  );
};

export default ReviewPage;
