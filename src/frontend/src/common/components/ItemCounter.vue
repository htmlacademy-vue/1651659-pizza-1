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
  data() {
    return {
      isDisableButtonMinus: true,
      isDisableButtonPlus: false,
      counterValue: 0,
    };
  },
  props: {
    inputName: {
      type: String,
      required: true,
    },
    currentIngredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeCounter(event) {
      if (event.target.name === "minus") {
        this.counterValue -= 1;
      } else if (event.target.name === "plus") {
        this.counterValue += 1;
      }
    },
  },
  watch: {
    counterValue: function () {
      if (this.counterValue === 0) {
        this.isDisableButtonMinus = true;
      } else {
        this.isDisableButtonMinus = false;
      }

      if (this.counterValue === 3) {
        this.isDisableButtonPlus = true;
      } else {
        this.isDisableButtonPlus = false;
      }

      this.$emit("updateIngredients", {
        name: this.inputName,
        count: this.counterValue,
      });
    },
    currentIngredients: function () {
      this.currentIngredients.forEach((item) => {
        item.value === this.inputName
          ? (this.counterValue = item.count)
          : this.counterValue;
      });
    },
  },
};
</script>
