<template>
  <div class="app-layout-main">
    <AppLayoutHeader :isLogged="isLogged" @logout="$emit('logout')" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutMain",

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
