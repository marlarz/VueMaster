import single from '@/services/http/api/single';

export default {
  namespaced: true,
  state: {
    content: null,
    loader: null,
  },
  getters: {
    getContent: (state) => state.content,
    getLoader: (state) => state.loader,
  },
  mutations: {
    setContent(state, data) {
      state.content = data;
    },
    setLoader(state, data) {
      state.loader = data;
    },
  },
  actions: {
    getPage({ commit }, payload) {
      commit('setLoader', true);
      single.get(payload).then(({ data }) => {
        commit('setContent', data);
      }).finally(() => {
        commit('setLoader', false);
      });
    },
  },
};
