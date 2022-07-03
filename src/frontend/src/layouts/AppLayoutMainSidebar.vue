<template>
  <div class="app-layout-main">
    <AppLayoutHeader />

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
};
</script>
