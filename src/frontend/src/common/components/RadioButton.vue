<template>
  <label :class="labelClass + (addClass === true ? itemValue : '')">
    <input
      type="radio"
      :name="inputName"
      :value="itemValue"
      class="visually-hidden"
      :checked="isChecked"
      @input="update"
    />
    <b v-if="description">{{ nameElem }}</b>
    <span v-if="description">{{ description }}</span>
    <span v-if="!description">{{ nameElem }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  methods: {
    update() {
      this.$emit("updateOrder", {
        checked: this.isChecked,
        value: this.itemValue,
        name: this.inputName,
      });
    },
  },
  props: {
    labelClass: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
    addClass: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
    nameElem: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
