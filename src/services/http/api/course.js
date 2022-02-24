import http from '@/services/http/index';
import endpoints from '@/services/http/endpoints';

export default {
  get(data) {
    return http.getWithHeaders(endpoints.get('course', data));
  },
};
