import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { Button, Headline } from '@/components';

function ReviewSuccess({ isVisible, navigation }: any) {
  return (
    <Modal
      isVisible={isVisible}
    >
      <View style={{
        backgroundColor: 'white', padding: 20, borderRadius: 20,
      }}
      >
        <Headline propStyles={{ marginBottom: 20, fontSize: 22, textAlign: 'center' }}>Review submitted</Headline>
        <Button
          text="Back to home"
          action={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </Modal>
  );
}

export default ReviewSuccess;
