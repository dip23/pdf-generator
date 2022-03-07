import axios from 'axios';

axios.interceptors.response.use(null, error => {
  const errorcode =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!errorcode) {
    console.log("Something went wronmg");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get
}