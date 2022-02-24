import auth from '@/services/http/api/auth';

import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    user: null,
    loader: null,
    isError: false,
    authenticated: false,
    loginForm: {
      identifier: null,
      password: null,
    },
    registerForm: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
  },
  getters: {
    getUser: (state) => state.user,
    getLoginFormFields(state) {
      return getField(state.loginForm);
    },
    getLoader: (state) => state.loader,
    isError: (state) => state.isError,
    isAuthenticated: (state) => state.authenticated,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    updateLoginFormFields(state, field) {
      updateField(state.loginForm, field);
    },
    setLoader(state, data) {
      state.loader = data;
    },
    setIsError(state, data) {
      state.isError = data;
    },
    setAuthenticated(state, data) {
      state.authenticated = data;
    },
  },
  actions: {
    login({ state, commit }) {
      commit('setIsError', false);
      commit('setLoader', true);
      return auth.login(state.loginForm).then((response) => {
        commit('setUser', response.data);
        commit('setAuthenticated', true);
        return response.data;
      }).catch(() => {
        commit('setIsError', true);
      }).finally(() => {
        commit('setLoader', false);
      });
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setAuthenticated', false);
    },
  },
};
