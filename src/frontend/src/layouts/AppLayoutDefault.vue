<template>
  <div class="app-layout-default">
    <AppLayoutHeader :isLogged="isLogged" @logout="$emit('logout')" />

    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
  },
  props: {
    isLogged: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
