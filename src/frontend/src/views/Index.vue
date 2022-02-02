<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :dough="dough" @updateOrder="updateOrder" />

        <BuilderSizeSelector :diameter="diameter" @updateOrder="updateOrder" />

        <BuilderIngredientsSelector
          :sauce="sauce"
          :dataArray="ingredients"
          @updateOrder="updateOrder"
          @updateIngredients="updateIngredients"
          @changeCounter="changeCounter"
        />

        <BuilderPizzaView
          :doughValue="doughValue"
          :valueSauce="order.currentSauce"
          :ingredientsArray="order.currentIngredients"
          @getNamePizza="getNamePizza"
          @onDrop="onDrop"
          :orderName="order.currentName"
          :isDisabledButton="isDisabledButton"
          @getCost="getCost"
          :doughPrice="doughPrice"
          :sizePrice="sizePrice"
          :saucePrice="saucePrice"
          :ingredientPrice="ingredientPrice"
        />
      </div>
    </form>
  </main>
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
    doughPrice() {
      if (this.order.currentDough != "") {
        const doughPrice = this.dough.filter(
          (item) => item.value === this.order.currentDough
        );

        return doughPrice[0].price;
      }

      return 0;
    },
    sizePrice() {
      if (this.order.currentSize != "") {
        const sizePrice = this.diameter.filter(
          (item) => item.value === this.order.currentSize
        );

        return sizePrice[0].multiplier;
      }

      return 0;
    },
    saucePrice() {
      if (this.order.currentSauce != "") {
        const saucePrice = this.sauce.filter(
          (item) => item.value === this.order.currentSauce
        );

        return saucePrice[0].price;
      }

      return 0;
    },
    ingredientPrice() {
      if (this.order.currentIngredients.length > 0) {
        var ingredientsPrices = 0;

        ingredientsPrices = this.order.currentIngredients
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );

        return ingredientsPrices;
      }

      return 0;
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

<style></style>
