<template>
  <div id="app">
    <AppLayout :isLogged="isLogged" @logout="logout">
      <router-view />
    </AppLayout>
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
      if (this.$route.path == "/profile" || this.$route.path == "/orders") {
        this.$router.push("/");
      }

      this.isLogged = false;

      return this.isLogged;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
