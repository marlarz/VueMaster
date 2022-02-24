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
      headers: { Authorization: 'Bearer xxx' },
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
