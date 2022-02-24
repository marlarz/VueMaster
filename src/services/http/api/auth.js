import http from '@/services/http/index';
import endpoints from '@/services/http/endpoints';

export default {
  login(data) {
    return http.post(endpoints.get('login'), data);
  },
  register(data) {
    return http.post(endpoints.get('register'), data);
  },
};
