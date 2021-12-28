import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { ProductScore } from '../components';
import { withTheme } from '@/styles/theme-context';

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#648041',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
});

// Move this component to relevant place later
function ProductItem({
  info, setSelected, colour, dark, theme,
}: any) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colour }]}
      onPress={() => {
        setSelected(info.barcode);
      }}
    >
      {info ? (
        <View style={styles.flex}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 35 }}
            source={{ uri: info.img }}
          />
          <Text
            style={[
              dark ? { color: theme.currentTheme.grey } : { color: theme.currentTheme.secondary },
              {
                fontWeight: 'bold',
                paddingLeft: 10,
                fontSize: 14,
              }]}
          >
            {info.productName}
          </Text>
          <ProductScore score={info.reviewAggregate} />
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </TouchableOpacity>
  );
}

export default withTheme(ProductItem);
