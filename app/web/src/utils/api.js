import axios from 'axios';

const BASE_URL = process.env.URL_API;
let token = localStorage.getItem(process.env.SESSION_TOKEN);

const orders = {

}

export const post = async (url, data, headers = null) => {
  const response = await axios.post(`${BASE_URL}/${url}`, data, headers);
  return response;
}

export const put = async (url, data) => {
  const response = await axios.put(`${BASE_URL}/${url}`, data);
  return response;
}

export const get = async (url, params) => {
  const response = await axios.get(`${BASE_URL}/${url}`, { params });
  return response;
}

export const session = async (url, headers) => {
  const response = await axios.post(`${BASE_URL}/${url}`, {}, headers);
  return response;
}

export default {
  post,
  put,
  get,
  session
}
