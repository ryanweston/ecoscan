import axios from 'axios';
import { API_URL } from '@env';

let headers = {};

export const request = axios.create({
  baseURL: API_URL,
  headers,
});

export const setTokenHeaders = (token: string) => {
  headers = { Authorization: `Bearer ${token}` };
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
};
