<template>
  <v-app>
    <v-main>
      <div
        class="d-flex flex-column justify-center align-center"
        style="height: calc(100vh - 100px); gap: 50px"
      >
        <h1>صفحه مورد نظر پیدا نشد 404</h1>
        <v-btn
          :to="{ name: 'Dashboard' }"
          color="primary pa-0 pe-4 ps-1 py-5 title"
          ><v-icon class="mx-2">mdi-home</v-icon>بازگشت به پنل ادمین</v-btn
        >
      </div>
    </v-main>
  </v-app>
</template>
