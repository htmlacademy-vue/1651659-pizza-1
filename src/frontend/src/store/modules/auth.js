import User from "@/static/user.json";
import { LOGOUT } from "../mutation-types.js";

export default {
  namespaced: true,

  state: {
    User,
    isLogged: true,
  },
  getters: {
    user(state) {
      return state.User;
    },
    isLogged(state) {
      return state.isLogged;
    },
  },
  mutations: {
    [LOGOUT](state, payload) {
      state.isLogged = payload;
    },
  },
  actions: {
    [LOGOUT]({ commit }, payload) {
      commit(LOGOUT, payload);
    },
  },
};
