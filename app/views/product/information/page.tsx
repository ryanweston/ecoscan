import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Subtitle, Title, Container, Body,
} from '@/components';
import { ITheme, IThemeProp } from '@/types';
import { withTheme } from '@/theme/theme-context';

interface Props {
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  section: {
    marginBottom: theme.tokens.gap,
  },
});

function InformationPage({ themeProp }: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <ScrollView>
      <Container>
        <View style={styles.section}>
          <Title>How do we calculate our sustainability scores?</Title>
        </View>
        <View style={styles.section}>
          <Subtitle>Impact</Subtitle>
          <Body>
            Impact represents the environmental impact of the materials in this product.
            For example, recyclable and biodegradable products score higher, plastics and
            non-degradable materials score less.
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>Quality</Subtitle>
          <Body>
            Quality is solely a user rating, based of the quality of the product.
            Does the product live up to expectations? Is it satisfactory?
            Would you buy it again?
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>Brand</Subtitle>
          <Body>
            Brand represents the sustainably of the product brand. These reviews are created
            and published by our own team. These reviews factor in: brand environmental initiatives,
            general sustainability, and carbon footprint.
          </Body>
        </View>
      </Container>
    </ScrollView>
  );
}

export default withTheme(InformationPage);
