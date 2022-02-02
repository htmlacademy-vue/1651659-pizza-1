<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>

    <div class="header__cart">
      <router-link to="/cart">{{ 1000 }} ₽</router-link>
      <!-- <a href="cart.html"> {{ orderCost }} ₽</a> -->
    </div>

    <div class="header__user" v-if="isLogged">
      <router-link to="/profile">
        <picture>
          <source
            type="image/webp"
            srcset="
              ../assets/img/users/user5.webp    1x,
              ../assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="../assets/img/users/user5.jpg"
            srcset="../assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>

      <a href="#" class="header__logout" @click.prevent="$emit('logout')">
        <span>Выйти</span>
      </a>
    </div>

    <div class="header__user" v-else>
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",

  props: {
    orderCost: {
      type: Number,
      required: true,
    },
    isLogged: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.header__login::after {
  margin-left: 8px;
}

.header__login::after,
.header__logout::before {
  content: "";
  background: url(../assets/img/login.svg) no-repeat center;
  background-size: auto 50%;
}
.header__login::after,
.header__logout::before,
.header__user img {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.header__user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
