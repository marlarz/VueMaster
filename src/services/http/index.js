import axios from 'axios';

export class Http {
  constructor() {
    this.axios = axios.create({
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
    });
    // this.axios.defaults.headers.common.Authorization = 'Bearer asd';
    this.cancelToken = axios.CancelToken;
    this.isCancel = axios.isCancel;
    this.config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI2NzE0NzY5LCJleHAiOjE2MjkzMDY3Njl9.6A721mGBxBF1NEfJbCLbfe2GFwB81U3-GIUCV-5G0P8' },
    };
  }

  get(url, params) {
    return this.axios.get(url, params);
  }

  post(url, data) {
    return this.axios.post(url, data);
  }

  postWithHeaders(url, data) {
    return this.axios.post(url, data, this.config);
  }

  getWithHeaders(url) {
    return this.axios.get(url, this.config);
  }

  put(url, data) {
    return this.axios.put(url, data);
  }

  delete(url, params) {
    return this.axios.delete(url, params);
  }

  // eslint-disable-next-line class-methods-use-this
  all(iterable) {
    return axios.all(iterable);
  }

  // eslint-disable-next-line class-methods-use-this
  spread(callback) {
    return axios.spread(callback);
  }
}

export default new Http();
