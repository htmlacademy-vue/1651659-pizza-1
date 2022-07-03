<template>
  <AppDrop @drop="onDrop">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="currentName"
          @input="updateName"
        />
      </label>

      <div class="content__constructor">
        <div :class="`pizza pizza--foundation--${doughValue}-${currentSauce}`">
          <div class="pizza__wrapper">
            <div
              v-for="item of currentIngredients"
              :key="item.id"
              :class="addClasses(item.value, item.count)"
            ></div>
          </div>
        </div>
      </div>

      <div class="content__result">
        <p>Итого {{ pizzaPrice }} ₽</p>
        <button
          type="button"
          class="button"
          :disabled="isDisabledButton"
          @click.prevent="pushOrder"
        >
          Готовьте!
        </button>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },
  methods: {
    addClasses(value, count) {
      return [
        "pizza__filling",
        `pizza__filling--${value}`,
        {
          "pizza__filling--second": count === 2,
          "pizza__filling--third": count === 3,
        },
      ];
    },
    onDrop(addIngredient) {
      this.$emit("onDrop", addIngredient);
    },
    ...mapActions("Builder", ["GET_NAME_PIZZA", "clearOrder"]),
    ...mapActions("Cart", ["updateCart"]),
    updateName(event) {
      this.GET_NAME_PIZZA(event.target.value);
    },
    pushOrder() {
      this.updateCart();
      this.clearOrder();
    },
  },
  computed: {
    ...mapGetters("Builder", [
      "doughValue",
      "currentSauce",
      "currentIngredients",
      "pizzaPrice",
      "isDisabledButton",
      "currentName",
    ]),
  },
};
</script>
