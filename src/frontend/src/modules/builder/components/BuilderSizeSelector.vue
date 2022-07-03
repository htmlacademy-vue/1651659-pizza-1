<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="item in diameter"
          :key="item.id"
          :labelClass="`diameter__input diameter__input--${item.value}`"
          :inputName="`diameter`"
          :nameElem="item.name"
          :itemValue="item.value"
          :isChecked="item.checked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },
  computed: {
    ...mapGetters("Builder", ["diameter"]),
  },
};
</script>

<style></style>
