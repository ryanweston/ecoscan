import axios from 'axios';

let headers = {};

export const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: headers,
});

export const setTokenHeaders = (token: string) => {
  headers = {Authorization: `Bearer ${token}`};
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
  // console.log('request', request);
};