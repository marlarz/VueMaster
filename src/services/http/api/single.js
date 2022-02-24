import http from '@/services/http/index';
import endpoints from '@/services/http/endpoints';

export default {
  get(type) {
    return http.get(endpoints.get('singleType', { type }));
  },
};
