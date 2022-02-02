<template>
  <div class="app-layout-main">
    <AppLayoutHeader :isLogged="isLogged" @logout="$emit('logout')" />

    <main class="layout">
      <Sidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/layouts/SideBar.vue";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutMainSidebar",

  components: {
    Sidebar,
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
