import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import ProgressSnail from 'react-native-progress/CircleSnail';
import { Headline } from '@/components';

interface Props {
  message: string
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

function LoadingPage({ message }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ProgressSnail style={{ marginBottom: 30 }} size={175} color={['green']} />
      <Headline>{message}</Headline>
    </SafeAreaView>
  );
}

export default LoadingPage;
