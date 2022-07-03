<template>
  <div class="counter additional-list__counter">
    <button
      type="button"
      name="minus"
      class="counter__button counter__button--minus"
      :disabled="quantity === 0 ? true : false"
      @click="changeMiscCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      :name="inputName"
      class="counter__input"
      :value="quantity"
    />
    <button
      type="button"
      name="plus"
      class="counter__button counter__button--plus counter__button--orange"
      @click="changeMiscCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MiscCounter",

  props: {
    quantity: {
      type: Number,
      default: 0,
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("Cart", ["CHANGE_MISC_COUNTER"]),
    changeMiscCounter(event) {
      this.CHANGE_MISC_COUNTER({
        name: event.target.name,
        quantity: this.quantity,
        inputName: this.inputName,
      });
    },
  },
};
</script>
