export interface IUser {
  name: string,
  email: string,
  picture: string,
}
export interface ITokens {
  accessToken: string,
  refreshToken: string,
}

export interface IThemeProp {
  dark: boolean,
  theme: ITheme,
  toggle(): void
}
export interface ITheme {
  colors: {
    primary: string,
    secondary: string,
    accent: string,
    greys: {
      background: string,
      border: string,
    },
    delete: string,
    background: string,
    text: string,
    textContrast: string,
    link: string,
    score: {
      noScore: string,
      low: string,
      med: string,
      high: string,
    },
  },
  tokens: {
    borderRadius: number,
    sectionGap: number,
    gap: number,
  },
}

export type {
  TabParamList,
  ScanStackParamList,
  HomeStackParamList,
  LoginStackParamList,
  ITypeComponentProps,
} from '@/types/props';

export type {
  IProduct,
  IProducts,
  ISustainableProduct,
  ISustainableProducts,
  IBrand,
  IReview,
} from '@/types/products';
