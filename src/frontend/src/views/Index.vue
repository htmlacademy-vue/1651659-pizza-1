<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <BuilderPizzaView @onDrop="onDrop" />
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

export default {
  name: "Index",

  data() {
    return {
      misc,
      user,
      doughValue: "small",
      order: {
        currentDough: "light",
        currentSize: "small",
        currentSauce: "tomato",
        currentIngredients: [],
        finishCost: 0,
        currentName: "",
      },
    };
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  methods: {
    onDrop(addIngredient) {
      this.ingredients
        .filter((item) => item.value === addIngredient)
        .forEach((item) => {
          if (item.count < 3) {
            item.count += 1;

            this.updateIngredients({
              name: addIngredient,
              count: item.count,
            });
          }
        });
    },
  },
};
</script>

<style></style>
