import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { Button, Title } from '@/components';
import { withTheme } from '@/theme/theme-context';
import {
  HomeStackParamList, ScanStackParamList, TabParamList, IThemeProp,
} from '@/types';

type ReviewScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList | ScanStackParamList, 'Review'>,
  BottomTabScreenProps<TabParamList>
>;
interface Props {
  isVisible: boolean,
  setModal(): void,
  navigation: ReviewScreenNavigationProp['navigation']
  themeProp: IThemeProp
}

function ReviewSuccess({
  isVisible, setModal, navigation, themeProp,
}: Props) {
  const { theme } = themeProp;
  return (
    <Modal
      isVisible={isVisible}
    >
      <View style={{
        backgroundColor: theme.colors.background,
        padding: theme.tokens.gap,
        borderRadius: theme.tokens.gap,
      }}
      >
        <Title style={{ marginBottom: 20, textAlign: 'center' }}>Review submitted</Title>
        <Button
          text="Back"
          action={() => {
            setModal();
            navigation.popToTop();
          }}
        />
      </View>
    </Modal>
  );
}

export default withTheme(ReviewSuccess);
