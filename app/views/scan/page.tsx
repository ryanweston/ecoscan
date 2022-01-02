import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  StyleSheet, View, Image, Text, Pressable, SafeAreaView,
} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import ProductModal from '../product/modal/product-modal';
import { withTheme } from '@/styles/theme-context';
import {
  ITheme, IThemeProp, ScanStackParamList, TabParamList,
} from '@/types';

type ScanScreenNavigationProp = CompositeScreenProps<
NativeStackScreenProps<ScanStackParamList, 'Scan'>,
BottomTabScreenProps<TabParamList>
>;

interface Props {
  navigation: ScanScreenNavigationProp['navigation'],
  themeProp: IThemeProp
}

const targetImg = require('@/assets/target.png');

const createStyles = (theme: ITheme) => StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  guide: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    width: '100%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.text,
    // backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

// Add this package to add support for functional component:
// https://github.com/reime005/react-native-camera-hooks

function ScanPage({ navigation, themeProp }: Props) {
  const [barcode, setBarcode] = useState('');

  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  const isVisible = !!barcode;
  const closeModal = () => setBarcode('');

  const onBarcodeRead = (scanResult: any) => {
    if (scanResult.data && scanResult.type && !barcode) {
      setBarcode(scanResult.data);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{
          marginTop: 10,
          zIndex: 1000,
          position: 'absolute',
          top: 40,
          left: 20,
          width: 50,
          height: 50,
          justifyContent: 'center',
          borderRadius: 100 / 2,
          backgroundColor: theme.colors.primary,
        }}
        >
          <Pressable
            style={{
              alignSelf: 'center',
            }}
            onPress={() => {
              navigation.navigate('HomeStack', { screen: 'Home' });
            }}
          >
            <MaterialCommunityIcons name="arrow-left" color={theme.colors.textContrast} size={30} />
          </Pressable>
        </View>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        // Remove exceptions after package is installed
        // @ts-ignore
        // eslint-disable-next-line react/jsx-no-bind
          onBarCodeRead={onBarcodeRead.bind(this)}
        />
        <View style={styles.guide}>
          <Image source={targetImg} />
          <Text style={{ color: theme.colors.textContrast, marginTop: 25 }}>
            Hover over a barcode to scan
          </Text>
        </View>
      </View>
      {barcode ? (
        <ProductModal
          isVisible={isVisible}
          closeModal={closeModal}
          barcode={barcode}
          navigation={navigation}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default withTheme(ScanPage);
