<template>
  <div class="counter cart-list__counter">
    <button
      type="button"
      name="minus"
      class="counter__button counter__button--minus"
      :disabled="quantity === 0 ? true : false"
      @click="changeCartCounter"
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
      @click="changeCartCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartCounter",
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
    ...mapActions("Cart", ["CHANGE_CART_COUNTER"]),
    changeCartCounter(event) {
      this.CHANGE_CART_COUNTER({
        name: event.target.name,
        quantity: this.quantity,
        inputName: this.inputName,
      });
    },
  },
};
</script>
