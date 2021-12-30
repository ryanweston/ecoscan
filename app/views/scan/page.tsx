import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  StyleSheet, View, Image, Text, Pressable,
} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductModal from '../product/modal/product-modal';
import { withTheme } from '@/styles/theme-context';

const targetImg = require('@/styles/target.png');

const styles = StyleSheet.create({
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
    backgroundColor: 'black',
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

function ScanPage({ navigation, theme }: any) {
  const [barcode, setBarcode] = useState('');

  const onBarcodeRead = (scanResult: any) => {
    if (scanResult.data && scanResult.type && !barcode) {
      // console.log('READ BARCODE', scanResult.data);
      // console.log(typeof scanResult.data);
      setBarcode(scanResult.data);
    }
  };

  return (
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
        backgroundColor: theme.currentTheme.primary,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }}
      >
        <Pressable
          style={{
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <MaterialCommunityIcons name="arrow-left" color={theme.currentTheme.secondary} size={30} />
        </Pressable>
      </View>
      {barcode ? (
        <ProductModal setBarcode={setBarcode} barcode={barcode} navigation={navigation} />
      ) : null}
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
        <Text style={{ color: 'white', marginTop: 25 }}>
          Hover over a barcode to scan
        </Text>
      </View>
    </View>
  );
}

export default withTheme(ScanPage);
