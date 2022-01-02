import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { Button, Title } from '@/components';
import { HomeStackParamList, ScanStackParamList, TabParamList } from '@/types';

type ReviewScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList | ScanStackParamList, 'Review'>,
  BottomTabScreenProps<TabParamList>
>;
interface Props {
  isVisible: boolean,
  setModal(): void,
  navigation: ReviewScreenNavigationProp['navigation']
}

function ReviewSuccess({ isVisible, setModal, navigation }: Props) {
  return (
    <Modal
      isVisible={isVisible}
    >
      <View style={{
        backgroundColor: 'white', padding: 20, borderRadius: 20,
      }}
      >
        <Title style={{ marginBottom: 20, textAlign: 'center' }}>Review submitted</Title>
        <Button
          text="Back to home"
          action={() => {
            setModal();
            navigation.navigate('HomeStack', { screen: 'Home' });
          }}
        />
      </View>
    </Modal>
  );
}

export default ReviewSuccess;
