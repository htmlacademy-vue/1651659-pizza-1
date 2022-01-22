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
        <p>Итого {{ orderPrice }} ₽</p>
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
    isDisabledButton: {
      type: Boolean,
      required: true,
    },
    doughPrice: {
      type: Number,
      required: true,
    },
    sizePrice: {
      type: Number,
      required: true,
    },
    saucePrice: {
      type: Number,
      required: true,
    },
    ingredientPrice: {
      type: Number,
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
    orderPrice() {
      return (
        this.sizePrice *
        (this.doughPrice + this.saucePrice + this.ingredientPrice)
      );
    },
  },
  watch: {
    orderPrice: function () {
      this.$emit("getCost", this.orderPrice);
    },
  },
};
</script>
