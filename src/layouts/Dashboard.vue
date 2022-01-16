<template>
  <v-app>
    <v-app-bar
      dark
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'primary lighten-1'"
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>داشبورد ادمین</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn
        icon
        class="darkmode-toggler"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon
          v-show="!$vuetify.theme.dark"
          class="mx-3"
          style="transform: rotate(-35deg)"
        >
          mdi-moon-waning-crescent
        </v-icon>
        <v-icon v-show="$vuetify.theme.dark" class="mx-3">
          mdi-white-balance-sunny
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      right
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'white red--text'"
      overlay-opacity="0.5"
      v-model="drawer"
    >
      <template #prepend>
        <v-list-item style="background: #236cc0; color: #fff">
          <v-list-item-avatar>
            <v-img src="../assets/dinnoLogoShadow .jpg" alt="avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>دینو</v-list-item-title>
            <v-list-item-subtitle style="color: rgba(255, 255, 255, 0.692)"
              >مدیر سایت</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list>
        <v-list-item v-for="i in 10" :key="i">
          <v-list-item-icon
            ><v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> داشبورد </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <div class="mx-4 mb-4">
          <v-btn
            color="blue darken-1"
            depressed
            width="100%"
            class=""
            @click="logout"
            >خروج</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
      dark
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'primary lighten-1'"
      padless
      class="py-6"
    >
      <v-row justify="center" align="center">
        <span>تمامی حقوق این سایت برای دینو محفوظ است 2021</span>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true,
      drawer: this.$vuetify.breakpoint.lgAndUp ? true : false,
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item {
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    background: #232323;
    .v-list-item__title,
    .v-icon {
      color: #fff;
    }
  }
}
</style>
