<template>
  <AppDrop @drop="onDrop">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="orderName"
          @input="updateName"
        />
      </label>

      <div class="content__constructor">
        <div :class="`pizza pizza--foundation--${doughValue}-${valueSauce}`">
          <div class="pizza__wrapper">
            <div
              v-for="item of ingredientsArray"
              :key="item.id"
              :class="addClasses(item.value, item.count)"
            ></div>
          </div>
        </div>
      </div>

      <div class="content__result">
        <p>Итого {{ getPizzaPrice }} ₽</p>
        <button type="button" class="button" :disabled="isDisabledButton">
          Готовьте!
        </button>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },
  props: {
    doughValue: {
      type: String,
      required: true,
    },
    valueSauce: {
      type: String,
      required: true,
    },
    ingredientsArray: {
      type: Array,
      required: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    checketDought: {
      type: Object,
      default() {
        return {};
      },
    },
    checkedSize: {
      type: Object,
      default() {
        return {};
      },
    },
    checkedSauce: {
      type: Object,
      default() {
        return {};
      },
    },
    isDisabledButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    addClasses(value, count) {
      return [
        "pizza__filling",
        `pizza__filling--${value}`,
        {
          "pizza__filling--second": count === 2,
          "pizza__filling--third": count === 3,
        },
      ];
    },
    onDrop(addIngredient) {
      this.$emit("onDrop", addIngredient);
    },
    updateName(event) {
      this.$emit("getNamePizza", event.target.value);
    },
  },
  computed: {
    getDoughtPrice() {
      return this.checketDought.price;
    },
    getSizePrice() {
      return this.checkedSize.multiplier;
    },
    getSaucePrice() {
      return this.checkedSauce.price;
    },
    getIngredientsPrice() {
      if (this.ingredientsArray.length > 0) {
        var ingredientsPrices = 0;

        ingredientsPrices = this.ingredientsArray
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );

        return ingredientsPrices;
      }

      return 0;
    },
    getPizzaPrice() {
      return (
        this.getSizePrice *
        (this.getDoughtPrice + this.getSaucePrice + this.getIngredientsPrice)
      );
    },
  },
  watch: {
    getPizzaPrice: function () {
      this.$emit("getCost", this.getPizzaPrice);
    },
  },
};
</script>
