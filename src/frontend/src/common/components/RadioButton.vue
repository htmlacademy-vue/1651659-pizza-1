<template>
  <label :class="labelClass">
    <input
      type="radio"
      :name="inputName"
      :value="itemValue"
      class="visually-hidden"
      :checked="isChecked"
      @change="update"
    />
    <b v-if="description">{{ nameElem }}</b>
    <span v-if="description">{{ description }}</span>
    <span v-if="!description">{{ nameElem }}</span>
  </label>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RadioButton",

  methods: {
    ...mapActions("Builder", ["UPDATE_ORDER"]),
    update() {
      this.UPDATE_ORDER([
        {
          checked: this.isChecked,
          value: this.itemValue,
          name: this.inputName,
        },
      ]);
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
