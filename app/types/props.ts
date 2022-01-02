import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { IThemeProp } from '.';
import { IProduct } from './products';

export interface ITypeComponentProps {
  dark?: boolean,
  children: React.ReactNode,
  themeProp: IThemeProp,
  style?: object
}

export type HomeStackParamList = {
  Home: undefined;
  Information: undefined;
  Review: { product: IProduct };
};

export type ScanStackParamList = {
  Scan: undefined
  Information: undefined;
  Review: { product: IProduct };
};

export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  ScanStack: NavigatorScreenParams<ScanStackParamList>
  Profile: undefined
}
