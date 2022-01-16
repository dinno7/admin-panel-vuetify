<template>
  <v-app>
    <v-app-bar
      app
      dark
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'primary lighten-1'"
      flat
    >
      <span class="subtitle-1">ورود به پنل ادمین</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="darkmode-toggler"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon v-show="!$vuetify.theme.dark" style="transform: rotate(-35deg)">
          mdi-moon-waning-crescent
        </v-icon>
        <v-icon v-show="$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
      </v-btn>
      <v-btn disabled icon><v-icon>mdi-home</v-icon></v-btn>
    </v-app-bar>
    <v-main
      class="d-flex align-center"
      :class="$vuetify.theme.dark || 'grey lighten-5'"
    >
      <router-view></router-view>
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
export default {};
</script>

<style></style>
