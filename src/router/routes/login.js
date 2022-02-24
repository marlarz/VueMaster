const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue');

export default {
  path: '/logowanie',
  name: 'Login',
  component: Login,
  meta: { requiresAuth: false },
};
