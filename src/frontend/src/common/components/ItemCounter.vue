<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      name="minus"
      class="counter__button counter__button--minus"
      :disabled="isDisableButtonMinus"
      @click="changeCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="inputName"
      class="counter__input"
      :value="counterValue"
      readonly
    />
    <button
      type="button"
      name="plus"
      class="counter__button counter__button--plus"
      :disabled="isDisableButtonPlus"
      @click="changeCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
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
  computed: {
    isDisableButtonMinus: function () {
      return this.counterValue === 0 ? true : false;
    },
    isDisableButtonPlus: function () {
      return this.counterValue >= 3 ? true : false;
    },
  },
  methods: {
    changeCounter(event) {
      this.$emit("changeCounter", {
        buttonName: event.target.name,
        inputName: this.inputName,
      });
    },
  },
  watch: {
    counterValue: function () {
      this.$emit("updateIngredients", {
        name: this.inputName,
        count: this.counterValue,
      });
    },
  },
};
</script>
