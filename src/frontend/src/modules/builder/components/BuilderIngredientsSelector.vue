<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="item in sauce"
            :key="item.id"
            labelClass="radio ingredients__input"
            :inputName="`sauce`"
            :addClass="false"
            :itemValue="item.value"
            :nameElem="item.name"
            :isChecked="item.checked"
            @updateOrder="updateOrder"
            v-model="currentValue"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item in dataArray"
              :key="item.id"
              class="ingredients__item"
            >
              <AppDrag :transferData="item.value">
                <SelectorItem :itemValue="item.value" :itemName="item.name" />
              </AppDrag>
              <ItemCounter
                :inputName="item.value"
                @updateIngredients="updateIngredients"
                @changeCounter="changeCounter"
                :counterValue="item.count"
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
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
    AppDrag,
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
    currentValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateOrder(data) {
      this.$emit("updateOrder", data);
    },
    updateIngredients(newValue) {
      this.$emit("updateIngredients", newValue);
    },
    changeCounter(data) {
      this.$emit("changeCounter", data);
    },
    isDisableButtonPlus(status) {
      this.$emit("isDisableButtonPlus", status);
    },
  },
};
</script>

<style></style>
