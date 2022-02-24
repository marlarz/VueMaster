import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';

import store from '@/store/index';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      name: 'Login',
    };
  }
});

export default router;
