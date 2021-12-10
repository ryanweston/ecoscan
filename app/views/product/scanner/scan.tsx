import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import ProductModal from './product-modal';

import {StyleSheet, View} from 'react-native';

const BarcodeReader = () => {
  // const {currentTheme} = React.useContext(ThemeContext);
  const [barcode, setBarcode] = useState('');

  const onBarcodeRead = (scanResult: any) => {
    if (scanResult.data && scanResult.type) {
      setBarcode(scanResult.data);
    }
  };

  return (
    <View style={styles.container}>
      {barcode ? (
        <ProductModal setBarcode={setBarcode} barcode={barcode} />
      ) : null}
      <RNCamera
        ref={ref => {
          //@ts-ignore
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
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          if (barcodes.length) {
            console.log(barcodes);
          }
        }}
        onBarCodeRead={onBarcodeRead.bind(this)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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

export default BarcodeReader;
