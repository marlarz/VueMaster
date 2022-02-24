import { createStore } from 'vuex';

import auth from '@/store/modules/auth';
import singlePage from '@/store/modules/singlePage';
import course from '@/store/modules/course';

export default createStore({
  modules: {
    auth,
    singlePage,
    course,
  },
});
