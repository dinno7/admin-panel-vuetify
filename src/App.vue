<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
