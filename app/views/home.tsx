import React from 'react';
import {Button, View} from 'react-native';

const Home = ({navigation}: any) => {
  return (
    <View>
      <Button
        title="Scan barcode"
        onPress={() => {
          navigation.navigate('Scan');
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
