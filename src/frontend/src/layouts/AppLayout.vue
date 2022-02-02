<template>
  <component :is="layout" :isLogged="isLogged" @logout="$emit('logout')">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },

  props: {
    isLogged: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
