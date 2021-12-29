export interface IUser {
  name: string,
  email: string,
  picture: string,
}

export interface IProducts extends Array<IProduct>{}

export interface IProduct {
  barcode: string,
  productName: string;
  image: string;
  reviewAggregate: IReview | Record<string, never>;
  reviewAmount: number,
  scanAmount: number,
  src: string
}

export interface IReview {
  qualityScore: number;
  sustainabilityScore: number;
}
export interface IBrand {

}
