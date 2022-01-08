import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { ProductScore } from '..';
import { withTheme } from '@/theme/theme-context';
import { shadowStyle } from '@/theme/theme';
import { IProduct, ITheme, IThemeProp } from '@/types';

interface Props {
  product: IProduct,
  // eslint-disable-next-line no-unused-vars
  action(arg: string): void,
  colour: string,
  dark: boolean,
  themeProp: IThemeProp,
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.colors.greys.background,
    // backgroundColor: '#648041',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  shadowStyle,
});

// Move this component to relevant place later
function ProductItem({
  product, action, colour, dark, themeProp,
}: Props) {
  // Pull in theme from context
  const { theme } = themeProp;

  // the Styles object will be re-generated if the theme changes
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colour }, shadowStyle]}
      onPress={() => {
        action(product.barcode);
      }}
    >
      {product ? (
        <View style={styles.flex}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{ uri: product.img }}
          />
          <Text
            style={[
              dark
                ? { color: theme.colors.textContrast }
                : { color: theme.colors.text },
              {
                fontWeight: 'bold',
                flex: 1,
                paddingLeft: 15,
                fontSize: 14,
                flexWrap: 'wrap',
              }]}
          >
            {product.productName}
          </Text>
          <ProductScore small score={product.reviewAggregate} />
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </TouchableOpacity>
  );
}

export default withTheme(ProductItem);
