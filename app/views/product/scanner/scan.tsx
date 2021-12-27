import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import ProductModal from './product-modal';

const targetImg = require('../../../styles/target.png');

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

function BarcodeReader() {
  const [barcode, setBarcode] = useState('');

  const onBarcodeRead = (scanResult: any) => {
    if (scanResult.data && scanResult.type && !barcode) {
      console.log('READ BARCODE', scanResult.data);
      console.log(typeof scanResult.data);
      setBarcode(scanResult.data);
    }
  };

  return (
    <View style={styles.container}>
      {barcode ? (
        <ProductModal setBarcode={setBarcode} barcode={barcode} />
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

export default BarcodeReader;
