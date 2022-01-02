export interface IProducts extends Array<IProduct>{}

export interface IProduct {
  barcode: string,
  productName: string;
  img: string;
  reviewAggregate: IReview | null;
  reviewAmount: number,
  scanAmount: number,
  src: string
  brand: IBrand | undefined
}

export interface IBrand {
  name: string,
  sustainabilityScore: number | string,
}

// Remove sustainable product types when API is sorted
export interface ISustainableProducts extends Array<ISustainableProduct>{}

export interface ISustainableProduct {
  product: {
    barcode: string,
    productName: string;
    img: string;
    reviewAmount: number,
  },
  qualityScore: number;
  sustainabilityScore: number;
}

export interface IReview {
  qualityScore: number;
  sustainabilityScore: number;
}
