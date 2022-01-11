<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <RadioButton
        classNameComponent="sheet__content dough"
        titleComponent=""
        inputName="dough"
        :dataArray="dough"
        labelClass="dough__input dough__input--"
        @updateOrder="updateOrder"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },
  props: {
    dough: {
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
