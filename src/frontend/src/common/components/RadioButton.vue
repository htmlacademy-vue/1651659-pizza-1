<template>
  <div :class="classNameComponent">
    <p v-if="titleComponent !== ''">{{ titleComponent }}</p>

    <label
      v-for="item in dataArray"
      :key="item.id"
      :class="labelClass + (addClass === 'true' ? item.value : '')"
    >
      <input
        type="radio"
        :name="inputName"
        :value="item.value"
        class="visually-hidden"
        :checked="item.checked"
        v-model="currentValue"
      />
      <b v-if="item.description">{{ item.name }}</b>
      <span v-if="item.description">{{ item.description }}</span>
      <span v-if="!item.description">{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",

  data() {
    return {
      currentValue: "",
    };
  },
  props: {
    classNameComponent: {
      type: String,
      required: true,
    },
    titleComponent: {
      type: String,
      required: true,
    },
    dataArray: {
      type: Array,
      required: true,
    },
    labelClass: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    addClass: {
      type: String,
      default: "true",
    },
  },
  methods: {
    updateCurrentValue() {
      let test = this.dataArray.filter((item) => item.checked === true);
      this.currentValue = test[0].value;
    },
  },
  watch: {
    currentValue: function () {
      this.$emit("updateOrder", {
        name: this.inputName,
        value: this.currentValue,
      });
    },
  },
  created() {
    this.updateCurrentValue();
  },
};
</script>
