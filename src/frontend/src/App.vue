<template>
  <div id="app">
    <AppLayout :isLogged="isLogged" @logout="logout" />

    <router-view />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import user from "@/static/user.json";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      user,
      isLogged: true,
    };
  },
  methods: {
    logout() {
      this.isLogged = false;
      return this.isLogged;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
