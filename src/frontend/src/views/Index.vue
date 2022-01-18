<template>
  <div>
    <AppLayout :orderCost="order.finishCost" />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :dough="dough"
            @updateOrder="updateOrder"
            :currentValue="order.currentDough"
          />

          <BuilderSizeSelector
            :diameter="diameter"
            @updateOrder="updateOrder"
            :currentValue="order.currentSize"
          />

          <BuilderIngredientsSelector
            :sauce="sauce"
            :dataArray="ingredients"
            :currentIngredients="order.currentIngredients"
            @updateOrder="updateOrder"
            @updateIngredients="updateIngredients"
            @changeCounter="changeCounter"
            @isDisableButtonPlus="isDisableButtonPlus"
            :currentValue="order.currentSauce"
          />

          <BuilderPizzaView
            :doughValue="doughValue"
            :valueSauce="order.currentSauce"
            :ingredientsArray="order.currentIngredients"
            @getNamePizza="getNamePizza"
            @onDrop="onDrop"
            :orderName="order.currentName"
            :checketDought="checketDought"
            :checkedSize="checkedSize"
            :checkedSauce="checkedSauce"
            @getCost="getCost"
            :isDisabledButton="isDisabledButton"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import Pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import {
  normalizeDough,
  normalizeSize,
  normalizeSauce,
  normalizeIngredients,
} from "@/common/helpers.js";
import AppLayout from "@/layouts/AppLayout.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

export default {
  name: "Index",

  data() {
    return {
      misc,
      user,
      dough: normalizeDough(Pizza.dough),
      diameter: normalizeSize(Pizza.sizes),
      sauce: normalizeSauce(Pizza.sauces),
      ingredients: normalizeIngredients(Pizza.ingredients),
      doughValue: "small",
      order: {
        currentDough: "light",
        currentSize: "small",
        currentSauce: "tomato",
        currentIngredients: [],
        finishCost: 0,
        currentName: "",
      },
    };
  },
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  methods: {
    updateOrder(newValue) {
      this[newValue.name].forEach((item) => {
        if (item.value === newValue.value) {
          item.checked = newValue.checked;
        } else {
          item.checked = false;
        }
      });

      if (newValue.name === "dough") {
        this.order.currentDough = newValue.value;

        if (newValue.value === "light") {
          this.doughValue = "small";
        } else {
          this.doughValue = "big";
        }
      }

      if (newValue.name === "sauce") {
        this.order.currentSauce = newValue.value;
      }

      if (newValue.name === "diameter") {
        this.order.currentSize = newValue.value;
      }
    },
    updateIngredients(newValue) {
      this.ingredients.forEach((item) => {
        item.value === newValue.name
          ? (item.count = newValue.count)
          : item.count;
      });

      this.order.currentIngredients = this.ingredients.filter(
        (item) => item.count > 0
      );
    },
    getNamePizza(pizzaName) {
      this.order.currentName = pizzaName;
    },
    changeCounter(name) {
      this.ingredients.forEach((item) => {
        if (name.buttonName === "minus") {
          item.value === name.inputName ? (item.count -= 1) : item.count;
        } else {
          item.value === name.inputName ? (item.count += 1) : item.count;
        }
      });
    },
    onDrop(addIngredient) {
      this.ingredients
        .filter((item) => item.value === addIngredient)
        .forEach((item) => {
          if (item.count < 3) {
            item.count += 1;

            this.updateIngredients({
              name: addIngredient,
              count: item.count,
            });
          }
        });
    },
    getCost(cost) {
      this.order.finishCost = cost;
    },
  },
  computed: {
    checketDought() {
      return this.dough.find((item) => {
        if (item.value === this.order.currentDough) {
          return item;
        } else {
          return 0;
        }
      });
    },
    checkedSize() {
      return this.diameter.find((item) => {
        if (item.value === this.order.currentSize) {
          return item;
        } else {
          return 0;
        }
      });
    },
    checkedSauce() {
      return this.sauce.find((item) => {
        if (item.value === this.order.currentSauce) {
          return item;
        } else {
          return 0;
        }
      });
    },
    isDisableButtonPlus(status) {
      return status;
    },
    isDisabledButton() {
      return this.order.currentName === "" ||
        this.order.currentIngredients.length === 0
        ? true
        : false;
    },
  },
};
</script>

<style>
.header__login::after {
  margin-left: 8px;
}

.header__login::after,
.header__logout::before {
  content: "";
  background: url(../assets/img/login.svg) no-repeat center;
  background-size: auto 50%;
}
.header__login::after,
.header__logout::before,
.header__user img {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
</style>
