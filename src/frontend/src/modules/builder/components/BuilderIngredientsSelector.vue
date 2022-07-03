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
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item in ingredients"
              :key="item.id"
              class="ingredients__item"
            >
              <AppDrag :transferData="item.value" :counterValue="item.count">
                <SelectorItem :itemValue="item.value" :itemName="item.name" />
              </AppDrag>
              <ItemCounter :inputName="item.value" :counterValue="item.count" />
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
import { mapGetters } from "vuex";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
    AppDrag,
  },
  computed: {
    ...mapGetters("Builder", ["sauce", "ingredients"]),
  },
};
</script>

<style></style>
