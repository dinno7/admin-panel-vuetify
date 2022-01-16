import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../layouts/Dashboard.vue"),
    children: [
      {
        path: "",
        meta: {
          auth: true,
        },
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../layouts/Auth.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
    ],
  },
  {
    name: "PageNotFound",
    path: "/404",
    component: () =>
      import(
        /* webpackChunkName: "pageNotFound" */ "../views/PageNotFound.vue"
      ),
  },
  {
    path: "/:match(.*)",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !JSON.parse(localStorage.getItem("user"))) {
    next({ name: "Login" });
  }
  next(true);
});

export default router;
