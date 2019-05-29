import axios from "axios";

let baseUrl = `http://${window.location.hostname}:7788/api/`;
export const baseURL = baseUrl;
export const headers = {
  Authorization: localStorage.token
};

axios.defaults.baseURL = baseURL;
axios.defaults.headers = headers;
axios.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(error.response);
});

export default axios;