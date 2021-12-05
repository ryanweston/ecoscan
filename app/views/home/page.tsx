import React from 'react';
import {Button, View} from 'react-native';
import {Headline} from '../../components';

const Home = ({navigation}: any) => {
  return (
    <View>
      <Headline>Headline</Headline>
      <Button
        title="Scan barcode"
        onPress={() => {
          navigation.navigate('Product');
        }}
      />
      <Button
        title="Click for big bunda!"
        onPress={() => {
          navigation.navigate('BUNDA');
        }}
      />
    </View>
  );
};

export default Home;
