export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutMainSidebar",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      layout: "AppLayoutMainSidebar",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/popup",
    name: "CartPopup",
    component: () => import("@/modules/cart/components/CartPopup.vue"),
  },
];
