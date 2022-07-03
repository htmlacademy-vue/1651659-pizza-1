<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      name="minus"
      class="counter__button counter__button--minus"
      :disabled="counterValue === 0 ? true : false"
      @click="updateCounterIngredients"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="inputName"
      class="counter__input"
      :value="counterValue"
      @input="updatePizzaIngredients"
      readonly
    />
    <button
      type="button"
      name="plus"
      class="counter__button counter__button--plus"
      :disabled="counterValue >= 3 ? true : false"
      @click="updateCounterIngredients"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ItemCounter",

  props: {
    counterValue: {
      type: Number,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("Builder", ["getCounterIngredients", "UPDATE_INGREDIENTS"]),
    updateCounterIngredients(event) {
      this.getCounterIngredients({
        buttonName: event.target.name,
        inputName: this.inputName,
      });
    },
    updatePizzaIngredients() {
      this.UPDATE_INGREDIENTS([
        {
          value: this.inputName,
          count: this.counterValue,
        },
      ]);
    },
  },
};
</script>
