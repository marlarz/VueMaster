const Course = () => import(/* webpackChunkName: "Course" */ '@/views/Course.vue');

export default {
  path: '/kurs/:id',
  name: 'Course',
  component: Course,
  props: true,
  meta: { requiresAuth: true },
};
