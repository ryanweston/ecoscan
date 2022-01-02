import React from 'react';
import { View } from 'react-native';
import { Headline, Container, Body } from '@/components';

const styles = {
  section: {
    marginBottom: 20,
  },
};

function InformationPage() {
  return (
    <Container>
      <View style={styles.section}>
        <Headline>Impact</Headline>
        <Body>
          Impact represents the environmental impact of the materials in this product.
          For example, recyclable and biodegradable products score higher, plastics and
          non-degradable materials score less.
        </Body>
      </View>

      <View style={styles.section}>
        <Headline>Quality</Headline>
        <Body>
          Impact represents the environmental impact of the materials in this product.
          For example, recyclable and biodegradable products score higher, plastics
          and non-degradable materials score less.
        </Body>
      </View>

      <View style={styles.section}>
        <Headline>Brand</Headline>
        <Body>
          Impact represents the environmental impact of the materials in this product.
          For example, recyclable and biodegradable products score higher, plastics
          and non-degradable materials score less.
        </Body>
      </View>
    </Container>
  );
}

export default InformationPage;
