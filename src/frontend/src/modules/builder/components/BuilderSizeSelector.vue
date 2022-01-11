<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        classNameComponent="sheet__content diameter"
        titleComponent=""
        :dataArray="diameter"
        labelClass="diameter__input diameter__input--"
        inputName="diameter"
        @updateOrder="updateOrder"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },
  props: {
    diameter: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },
  },
};
</script>

<style></style>
