import React, { useEffect, useState } from 'react';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import {
  StyleSheet, View, Image, Text, Pressable, SafeAreaView,
} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
// import { useCamera } from 'react-native-camera-hooks';
import ProductModal from '../product/modal/product-modal';
import { withTheme } from '@/theme/theme-context';
import {
  ITheme, IThemeProp, ScanStackParamList, TabParamList,
} from '@/types';
import { useStatusBar } from '@/utils/statusBar';

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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.text,
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
    paddingHorizontal: theme.tokens.gap,
    alignSelf: 'center',
    margin: theme.tokens.gap,
  },
});

// Add this package to add support for functional component:
// https://github.com/reime005/react-native-camera-hooks

function ScanPage({ navigation, themeProp }: Props) {
  const [barcode, setBarcode] = useState('');
  const [focus, setFocus] = useState(true);
  // const [{ cameraRef }] = useCamera();

  useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setFocus(true);
      },
    );
  }, []);

  useStatusBar('light-content');
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  const closeModal = () => setBarcode('');

  const onBarcodeRead = (scanResult: BarCodeReadEvent) => {
    if (scanResult.data && scanResult.type && !barcode) {
      setBarcode(scanResult.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{
          zIndex: 1000,
          position: 'absolute',
          marginTop: 10,
          top: theme.tokens.gap,
          left: theme.tokens.gap,
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
        { focus ? (
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            // Remove exceptions after package is installed
            // @ts-ignore
            // eslint-disable-next-line react/jsx-no-bind
            onBarCodeRead={onBarcodeRead.bind(this)}
          />
        ) : null}
        <View style={styles.guide}>
          <Image source={targetImg} />
          <Text style={{ color: theme.colors.textContrast, marginTop: 25 }}>
            Hover over a barcode to scan
          </Text>
        </View>
      </View>

      { barcode ? (
        <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <ProductModal
            closeModal={closeModal}
            barcode={barcode}
            navigation={navigation}
          />
        </View>
      ) : null }
    </SafeAreaView>
  );
}

export default withTheme(ScanPage);
