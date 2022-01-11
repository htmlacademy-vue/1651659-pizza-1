<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <RadioButton
          classNameComponent="ingredients__sauce"
          titleComponent="Основной соус:"
          :dataArray="sauce"
          labelClass="radio ingredients__input"
          inputName="sauce"
          addClass="false"
          checkedElem="checkedSauce"
          @updateOrder="updateOrder"
        />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item in dataArray"
              :key="item.id"
              class="ingredients__item"
            >
              <SelectorItem :itemValue="item.value" :itemName="item.name" />
              <ItemCounter
                :inputName="item.value"
                :counterValue="item.count"
                @updateIngredients="updateIngredients"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  data() {
    return {
      newArray: [],
    };
  },
  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
  },
  props: {
    sauce: {
      type: Array,
      required: true,
    },
    dataArray: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },
    updateIngredients(newValue) {
      this.$emit("updateIngredients", newValue);
    },
  },
};
</script>

<style></style>
