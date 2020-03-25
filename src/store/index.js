import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leftandright: true,
    canEdit: true
  },
  mutations: {
    leftandrightM(state) {
      state.leftandright = !state.leftandright;
    },
    canEditM(state) {
      state.canEdit = !state.canEdit;
    }
  },
  actions: {},
  modules: {}
});
