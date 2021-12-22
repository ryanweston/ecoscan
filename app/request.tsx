import axios from 'axios';

let headers = {};

export const request = axios.create({
  baseURL: 'http://192.168.0.120:3000',
  headers: headers,
});

export const setTokenHeaders = (token: string) => {
  headers = {Authorization: `Bearer ${token}`};
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
  // console.log('request', request);
};
