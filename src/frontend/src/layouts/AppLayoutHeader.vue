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
      <router-link to="/cart">{{ totalCartPrice }} ₽</router-link>
    </div>

    <div class="header__user" v-if="isLogged">
      <router-link to="/profile">
        <picture>
          <source
            type="image/webp"
            :srcset="`${user.avatar}    1x, ${user.avatar} 2x`"
          />
          <img
            :src="user.avatar"
            :srcset="user.avatar"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>

      <a href="#" class="header__logout" @click.prevent="logout">
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppLayoutHeader",

  computed: {
    ...mapGetters("Cart", ["totalCartPrice"]),
    ...mapGetters("Auth", ["user", "isLogged"]),
  },
  methods: {
    ...mapActions("Auth", ["LOGOUT"]),
    logout() {
      if (this.$route.path == "/profile" || this.$route.path == "/orders") {
        this.$router.push("/");
      }

      this.LOGOUT(false);
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
