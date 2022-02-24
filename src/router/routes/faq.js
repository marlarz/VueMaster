const Faq = () => import(/* webpackChunkName: "Faq" */ '@/views/Faq.vue');

export default {
  path: '/faq',
  name: 'Faq',
  component: Faq,
  meta: { requiresAuth: false },
};
