import axios from 'axios';

let headers = {};

export const request = axios.create({
  baseURL: 'http://192.168.1.63:3000',
  headers,
});

export const setTokenHeaders = (token: string) => {
  headers = { Authorization: `Bearer ${token}` };
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
};
