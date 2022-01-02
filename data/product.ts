import {
  IProduct, IProducts, ISustainableProduct, ISustainableProducts,
} from '@/types';

export const mockProduct: IProduct = {
  barcode: '5011914902293',
  img: 'http://google.com/images/wow.png',
  productName: 'Bob Martin Clear Home Flea Spray',
  reviewAggregate: null,
  reviewAmount: 0,
  scanAmount: 68,
  src: 'google',
};

export const mockSustainableProduct: ISustainableProduct = {
  product: {
    barcode: '5011914902293',
    img: 'http://google.com/images/wow.png',
    productName: 'Bob Martin Clear Home Flea Spray',
    reviewAmount: 0,
  },
  qualityScore: 5,
  sustainabilityScore: 5,
};

export const mockProducts: IProducts = [
  mockProduct,
  { ...mockProduct, barcode: '1010101010' },
];

export const mockSustainableProducts: ISustainableProducts = [
  mockSustainableProduct,
  {
    product: {
      ...mockSustainableProduct.product,
      barcode: '20202020202',
    },
    qualityScore: mockSustainableProduct.qualityScore,
    sustainabilityScore: mockSustainableProduct.qualityScore,

  },
];
