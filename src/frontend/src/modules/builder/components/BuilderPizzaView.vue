<template>
  <AppDrop @drop="onDrop">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          v-model="inputValue"
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
        <p>Итого {{ finishCost }} ₽</p>
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
  data() {
    return {
      inputValue: "",
    };
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
    finishCost: {
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
  },
  computed: {
    isDisabledButton() {
      return this.inputValue === "" || this.ingredientsArray.length === 0
        ? true
        : false;
    },
  },
  watch: {
    inputValue: function () {
      this.$emit("getNamePizza", this.inputValue);
    },
  },
};
</script>
