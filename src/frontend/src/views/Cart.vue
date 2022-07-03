<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="orders.length === 0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-else>
          <li v-for="order in orders" :key="order.id" class="cart-list__item">
            <div class="product cart-list__product">
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="order.name"
              />
              <div class="product__text">
                <h2>{{ order.name }}</h2>
                <ul>
                  <li>{{ order.pizzaSize }}, {{ order.pizzaDough }}</li>
                  <li>Соус: {{ order.pizzaSauce }}</li>
                  <li>Начинка: {{ order.pizzaIngredients }}</li>
                </ul>
              </div>
            </div>

            <CartCounter :quantity="order.quantity" :inputName="order.name" />

            <div class="cart-list__price">
              <b>{{ order.totalPrice }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="changeOrder(order)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div class="cart__additional" v-if="orders.length !== 0">
          <ul class="additional-list">
            <li
              class="additional-list__item sheet"
              v-for="product in misc"
              :key="product.id"
            >
              <p class="additional-list__description">
                <img
                  :src="product.image"
                  width="39"
                  height="60"
                  :alt="product.name"
                />
                <span>{{ product.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <MiscCounter
                  :quantity="product.quantity"
                  :inputName="product.name"
                />

                <div class="additional-list__price">
                  <b>× {{ product.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <CartForm v-if="orders.length !== 0" />
      </div>
    </main>

    <CartFooter v-if="orders.length !== 0" />
  </form>
</template>

<script>
import MiscCounter from "@/modules/cart/components/MiscCounter";
import CartCounter from "@/modules/cart/components/CartCounter";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",

  components: {
    MiscCounter,
    CartCounter,
    CartForm,
    CartFooter,
  },
  computed: {
    ...mapGetters("Cart", ["orders", "misc"]),
    ...mapGetters("Auth", ["user"]),
  },
  methods: {
    ...mapActions("Builder", [
      "UPDATE_ORDER",
      "GET_NAME_PIZZA",
      "UPDATE_INGREDIENTS",
    ]),
    ...mapActions("Cart", ["DELETE_ORDER"]),
    changeOrder(order) {
      this.UPDATE_ORDER([
        {
          checked: true,
          value: order.dough,
          name: "dough",
        },
        {
          checked: true,
          value: order.sauce,
          name: "sauce",
        },
        {
          checked: true,
          value: order.size,
          name: "diameter",
        },
      ]);

      this.GET_NAME_PIZZA(order.name);
      this.UPDATE_INGREDIENTS(order.ingredients);
      this.DELETE_ORDER(order.name);
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
