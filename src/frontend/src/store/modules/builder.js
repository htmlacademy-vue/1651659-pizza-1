import Pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeSize,
  normalizeSauce,
  normalizeIngredients,
} from "@/common/helpers.js";
import {
  UPDATE_ORDER,
  UPDATE_INGREDIENTS,
  CHANGE_COUNTER,
  GET_NAME_PIZZA,
} from "../mutation-types.js";

const defaultState = () => ({
  Pizza,
  dough: normalizeDough(Pizza.dough),
  diameter: normalizeSize(Pizza.sizes),
  sauce: normalizeSauce(Pizza.sauces),
  ingredients: normalizeIngredients(Pizza.ingredients),
  doughValue: "",
  order: {
    currentDough: null,
    currentSize: null,
    currentSauce: null,
    currentIngredients: [],
    finishCost: 0,
    currentName: null,
  },
  pizza: {
    dough: "",
    size: "",
    sauce: "",
    ingredients: [],
  },
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    dough(state) {
      return state.dough;
    },
    diameter(state) {
      return state.diameter;
    },
    sauce(state) {
      return state.sauce;
    },
    ingredients(state) {
      return state.ingredients;
    },
    currentDough(state, getters) {
      if (state.order.currentDough === null) {
        state.order.currentDough = getters.dough.find(
          (item) => item.checked === true
        ).value;
      }

      return state.order.currentDough;
    },
    currentSize(state, getters) {
      if (state.order.currentSize === null) {
        state.order.currentSize = getters.diameter.find(
          (item) => item.checked === true
        ).value;
      }

      return state.order.currentSize;
    },
    currentSauce(state, getters) {
      if (state.order.currentSauce === null) {
        state.order.currentSauce = getters.sauce.find(
          (item) => item.checked === true
        ).value;
      }

      return state.order.currentSauce;
    },
    currentIngredients(state) {
      state.order.currentIngredients = state.ingredients.filter(
        (item) => item.count > 0
      );

      return state.order.currentIngredients;
    },
    currentName(state) {
      return state.order.currentName;
    },
    isDisabledButton(state) {
      return state.order.currentName === null ||
        state.order.currentIngredients.length === 0
        ? true
        : false;
    },
    doughValue(state, getters) {
      state.doughValue = getters.dough.find(
        (item) => item.value === getters.currentDough
      ).doughSize;

      return state.doughValue;
    },
    pizzaPrice(state, getters) {
      const doughPrice = getters.dough.find(
        (item) => item.value === getters.currentDough
      ).price;

      const sizePrice = getters.diameter.find(
        (item) => item.value === getters.currentSize
      ).multiplier;

      const saucePrice = getters.sauce.find(
        (item) => item.value === getters.currentSauce
      ).price;

      let ingredientsPrice = 0;

      if (state.order.currentIngredients.length > 0) {
        ingredientsPrice = getters.currentIngredients
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      }

      state.order.finishCost =
        sizePrice * (doughPrice + saucePrice + ingredientsPrice);

      return state.order.finishCost;
    },
  },
  mutations: {
    [UPDATE_ORDER](state, newValues) {
      if (newValues === null) {
        Object.assign(state, defaultState());
        return;
      }

      newValues.filter((newValue) => {
        state[newValue.name].forEach((item) => {
          if (item.value === newValue.value) {
            item.checked = newValue.checked;
          } else {
            item.checked = false;
          }
        });

        if (newValue.name === "dough") {
          state.order.currentDough = newValue.value;

          state.pizza.dough = state.dough.find(
            (item) => item.value === newValue.value
          ).result;
        }

        if (newValue.name === "sauce") {
          state.order.currentSauce = newValue.value;
        }

        if (newValue.name === "diameter") {
          state.order.currentSize = newValue.value;
        }
      });
    },
    [UPDATE_INGREDIENTS](state, newValue) {
      if (newValue === null) {
        Object.assign(state, defaultState());
        return;
      }

      state.ingredients.forEach((item) => {
        newValue.forEach((elem) => {
          item.value === elem.value ? (item.count = elem.count) : item.count;
        });
      });
    },
    [CHANGE_COUNTER](state, name) {
      state.ingredients.forEach((item) => {
        if (name.buttonName === "minus") {
          if (item.value === name.inputName) {
            item.count -= 1;
          }
        } else {
          if (item.value === name.inputName) {
            item.count += 1;
          }
        }
      });
    },
    [GET_NAME_PIZZA](state, pizzaName) {
      state.order.currentName = pizzaName;
    },
  },
  actions: {
    [UPDATE_ORDER]({ commit }, newValue) {
      commit(UPDATE_ORDER, newValue);
    },
    [UPDATE_INGREDIENTS]({ commit }, newValue) {
      commit(UPDATE_INGREDIENTS, newValue);
    },
    getCounterIngredients({ commit }, name) {
      commit(CHANGE_COUNTER, name);
    },
    [GET_NAME_PIZZA]({ commit }, name) {
      commit(GET_NAME_PIZZA, name);
    },
    clearOrder({ commit }) {
      commit(UPDATE_ORDER, null);
      commit(UPDATE_INGREDIENTS, null);
      commit(GET_NAME_PIZZA, null);
    },
  },
};
