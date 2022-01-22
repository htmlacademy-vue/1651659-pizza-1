<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="item in dough"
          :key="item.id"
          :inputName="`dough`"
          :labelClass="`dough__input dough__input--${item.value}`"
          :itemValue="item.value"
          :description="item.description"
          :nameElem="item.name"
          :isChecked="item.checked"
          @updateOrder="updateOrder"
        />
      </div>
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
    updateOrder(data) {
      this.$emit("updateOrder", data);
    },
  },
};
</script>

<style></style>
