import axios from 'axios';

let headers = {};

export const request = axios.create({
  baseURL: 'https://netscapes-api-01.herokuapp.com',
  headers,
});

export const setTokenHeaders = (token: string) => {
  headers = { Authorization: `Bearer ${token}` };
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
};
