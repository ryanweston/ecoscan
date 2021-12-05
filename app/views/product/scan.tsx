import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {ThemeContext} from '../../styles/theme-context';

import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

const BarcodeReader = ({navigation}: any) => {
  const {currentTheme} = React.useContext(ThemeContext);
  const [barcode, setBarcode] = useState('');

  const takePicture = async () => {
    //@ts-ignore
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      //@ts-ignore
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const onBarcodeRead = async (scanResult: any) => {
    if (scanResult.data && scanResult.type) {
      setBarcode(scanResult.data);
      navigation.navgiate('Product');
    }
    return;
  };

  return (
    <View style={styles.container}>
      {barcode ? (
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={takePicture.bind(this)}
            style={{...styles.capture, backgroundColor: currentTheme.primary}}>
            <Text style={{fontSize: 14}}> {barcode} </Text>
          </TouchableOpacity>
        </View>
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
