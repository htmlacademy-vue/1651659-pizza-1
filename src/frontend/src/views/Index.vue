<template>
  <div>
    <AppLayout :orderCost="order.finishCost" />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :dough="doughs" @updateOrder="updateOrder" />

          <BuilderSizeSelector :diameter="sizes" @updateOrder="updateOrder" />

          <BuilderIngredientsSelector
            :sauce="sauces"
            :dataArray="ingredients"
            :currentIngredients="order.currentIngredients"
            @updateOrder="updateOrder"
            @updateIngredients="updateIngredients"
          />

          <BuilderPizzaView
            :doughValue="doughValue"
            :valueSauce="order.currentSauce"
            :ingredientsArray="order.currentIngredients"
            :finishCost="order.finishCost"
            @getNamePizza="getNamePizza"
            @onDrop="onDrop"
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
      doughs: normalizeDough(Pizza.dough),
      sizes: normalizeSize(Pizza.sizes),
      sauces: normalizeSauce(Pizza.sauces),
      ingredients: normalizeIngredients(Pizza.ingredients),
      doughValue: null,
      order: {
        currentDough: null,
        currentSize: null,
        currentSauce: null,
        currentIngredients: [],
        finishCost: 0,
        currentName: null,
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

      this.$nextTick(() => {
        this.getCost();
      });
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

      this.$nextTick(() => {
        this.getCost();
      });
    },
    getCost() {
      const checketDought = this.doughs.filter(
        (item) => item.value === this.order.currentDough
      );

      const checkedSize = this.sizes.filter(
        (item) => item.value === this.order.currentSize
      );

      const checkedSauce = this.sauces.filter(
        (item) => item.value === this.order.currentSauce
      );

      var ingredientsPrices = 0;

      if (this.order.currentIngredients.length > 0) {
        ingredientsPrices = this.order.currentIngredients
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      }

      this.order.finishCost =
        checkedSize[0].multiplier *
        (checketDought[0].price + checkedSauce[0].price + ingredientsPrices);
    },
    getNamePizza(pizzaName) {
      console.log(pizzaName);
      this.order.currentName = pizzaName;
    },
    onDrop(addIngredient) {
      this.ingredients
        .filter((item) => item.value === addIngredient)
        .forEach((item) => {
          item.count += 1;

          if (item.count <= 3) {
            this.updateIngredients({
              name: addIngredient,
              count: item.count,
            });
          }
        });
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
