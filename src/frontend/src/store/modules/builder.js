import Pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeSize,
  normalizeSauce,
  normalizeIngredients,
} from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    Pizza,
  },
  getters: {
    dough() {
      return normalizeDough(Pizza.dough);
    },
    diameter() {
      return normalizeSize(Pizza.sizes);
    },
    sauce() {
      return normalizeSauce(Pizza.sauces);
    },
    ingredients() {
      return normalizeIngredients(Pizza.ingredients);
    },
  },
  mutations: {},
  actions: {},
};
