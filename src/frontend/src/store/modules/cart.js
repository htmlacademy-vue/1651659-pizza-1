import {
  ADD_TO_CART,
  CHANGE_CART_COUNTER,
  CHANGE_MISC_COUNTER,
  DELETE_ORDER,
} from "../mutation-types.js";
import { normalizeMisc } from "@/common/helpers.js";
import Misc from "@/static/misc.json";

const defaultState = () => ({
  orders: [],
  misc: normalizeMisc(Misc),
});

export default {
  namespaced: true,

  state: defaultState(),
  getters: {
    orders(state) {
      return state.orders;
    },
    misc(state) {
      return state.misc;
    },
    totalCartPrice(state) {
      if (state.orders.length == 0) return 0;

      const totalPizzasPrice = state.orders.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);

      const totalMiscsPrice = state.misc.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);

      return totalPizzasPrice + totalMiscsPrice;
    },
  },
  mutations: {
    [ADD_TO_CART](state, order) {
      state.orders.push(order);
    },
    [CHANGE_CART_COUNTER](state, data) {
      state.orders.forEach((item) => {
        if (item.name === data.inputName) {
          if (data.name === "minus") {
            item.quantity -= 1;
          } else {
            item.quantity += 1;
          }

          item.totalPrice = item.quantity * item.price;
        }
      });

      if (data.quantity === 0) {
        state.orders = state.orders.filter((item) => {
          item.name !== data.inputName;
        });
      }
    },
    [CHANGE_MISC_COUNTER](state, data) {
      state.misc.map((item) => {
        if (item.name === data.inputName) {
          if (data.name === "minus") {
            item.quantity -= 1;
          } else {
            item.quantity += 1;
          }
        }
      });

      console.log(state.misc);
    },
    [DELETE_ORDER](state, name) {
      state.orders = state.orders.filter((item) => item.name !== name);
    },
  },
  actions: {
    updateCart({ rootGetters, commit }) {
      commit(ADD_TO_CART, {
        dough: rootGetters["Builder/currentDough"],
        size: rootGetters["Builder/currentSize"],
        sauce: rootGetters["Builder/currentSauce"],
        ingredients: rootGetters["Builder/currentIngredients"],
        price: rootGetters["Builder/pizzaPrice"],
        name: rootGetters["Builder/currentName"],
        quantity: 1,
        minQuantity: 1,
        pizzaDough: rootGetters["Builder/dough"].find(
          (item) => item.value === rootGetters["Builder/currentDough"]
        ).result,
        pizzaSize: rootGetters["Builder/diameter"].find(
          (item) => item.value === rootGetters["Builder/currentSize"]
        ).name,
        pizzaSauce: rootGetters["Builder/sauce"].find(
          (item) => item.value === rootGetters["Builder/currentSauce"]
        ).name,
        pizzaIngredients: rootGetters["Builder/currentIngredients"]
          .map((item) => item.name)
          .join(", ")
          .toLowerCase(),
        totalPrice: rootGetters["Builder/pizzaPrice"],
      });
    },
    [CHANGE_MISC_COUNTER]({ commit }, data) {
      commit(CHANGE_MISC_COUNTER, data);
    },
    [CHANGE_CART_COUNTER]({ commit }, data) {
      commit(CHANGE_CART_COUNTER, data);
    },
    [DELETE_ORDER]({ commit }, name) {
      commit(DELETE_ORDER, name);
    },
    sendOrder({ state, rootState }) {
      rootState.Orders.orders.push({
        pizza: state.orders,
        misc: state.misc,
      });

      Object.assign(state, defaultState());
    },
  },
};
