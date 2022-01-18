<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="item in diameter"
          :key="item.id"
          labelClass="diameter__input diameter__input--"
          :inputName="`diameter`"
          :nameElem="item.name"
          :itemValue="item.value"
          :isChecked="item.checked"
          @updateOrder="updateOrder"
          v-model="currentValue"
        />
      </div>
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
    currentValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateOrder(data) {
      this.$emit("updateOrder", data);
    },
  },
};
</script>

<style></style>
