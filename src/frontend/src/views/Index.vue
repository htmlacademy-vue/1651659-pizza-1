<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="../assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :dough="doughs" @updateOrder="updateOrder" />

          <BuilderSizeSelector :diameter="sizes" @updateOrder="updateOrder" />

          <BuilderIngredientsSelector
            :sauce="sauces"
            :dataArray="ingredients"
            @updateOrder="updateOrder"
            @updateIngredients="updateIngredients"
          />

          <BuilderPizzaView
            :sizeValue="sizeValue"
            :valueSauce="sauceValue"
            :ingredientsArray="ingredientsArray"
            :finishCost="finishCost"
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
      sizeValue: null,
      sauceValue: null,
      currentIngredient: null,
      ingredientsArray: [],
      finishCost: 0,
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
      if (newValue.name === "dough") {
        if (newValue.value === "light") {
          this.sizeValue = "small";
        } else {
          this.sizeValue = "big";
        }
      }

      if (newValue.name === "sauce") {
        this.sauceValue = newValue.value;
      }

      this.getCost();
    },
    updateIngredients(newValue) {
      this.ingredients.forEach((item) => {
        item.value === newValue.name
          ? (item.count = newValue.count)
          : item.count;
      });

      this.ingredientsArray = this.ingredients.filter((item) => item.count > 0);
    },
    getCost() {
      const checketDought = this.doughs.filter((item) => item.checked === true);
      console.log(checketDought[0].price);
      const checkedSize = this.sizes.filter((item) => item.checked === true);
      console.log(checkedSize[0].multiplier);
      const checkedSauce = this.sauces.filter((item) => item.checked === true);
      console.log(checkedSauce[0].price);
      this.finishCost =
        checkedSize[0].multiplier *
        (checketDought[0].price + checkedSauce[0].price);
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
