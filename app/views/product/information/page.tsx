import React from 'react';
import { Text, View } from 'react-native';
import { Headline, Container } from '@/components';

function InformationPage() {
  return (
    <Container>
      <View style={{ marginBottom: 20 }}>
        <Headline>Impact</Headline>
        <Text>Impact represents the environmental impact of the materials in this product. For example, recyclable and biodegradable products score higher, plastics and non-degradable materials score less.</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Headline>Quality</Headline>
        <Text>Impact represents the environmental impact of the materials in this product. For example, recyclable and biodegradable products score higher, plastics and non-degradable materials score less.</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Headline>Brand</Headline>
        <Text>Impact represents the environmental impact of the materials in this product. For example, recyclable and biodegradable products score higher, plastics and non-degradable materials score less.</Text>
      </View>
    </Container>
  );
}

export default InformationPage;
