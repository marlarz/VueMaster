import course from '@/services/http/api/course';

export default {
  namespaced: true,
  state: {
    loader: null,
    course: null,
  },
  getters: {
    getLoader: (state) => state.loader,
    getCourse: (state) => state.course,
  },
  mutations: {
    setLoader(state, data) {
      state.loader = data;
    },
    setCourse(state, data) {
      state.course = data;
    },
  },
  actions: {
    getCourse({ commit }, payload) {
      commit('setLoader', true);
      return course.get(payload).then(({ data }) => {
        commit('setCourse', data);
      }).finally(() => {
        commit('setLoader', false);
      });
    },
  },
};
