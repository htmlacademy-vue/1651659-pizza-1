<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${sizeValue}-${valueSauce}`">
        <div class="pizza__wrapper">
          <div
            v-for="item of ingredientsArray"
            :key="item.id"
            :class="addClasses(item.value, item.count)"
          ></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>{{ finishCost }}</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",

  props: {
    sizeValue: {
      type: String,
      required: false,
    },
    valueSauce: {
      type: String,
      required: false,
    },
    ingredientsArray: {
      type: Array,
      required: false,
    },
    finishCost: {
      type: Number,
      required: true,
    },
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
  },
};
</script>
