<template>
  <v-form ref="loginForm">
    <v-card
      :loading="loading"
      class="mx-auto"
      elevation="1"
      max-width="344"
      outlined
    >
      <v-card-title>
        <h3>فرم ورود</h3>
      </v-card-title>

      <v-text-field
        ref="mailInput"
        class="mx-3"
        v-model="form.email"
        outlined
        label="ایمیل"
        append-icon="mdi-at"
        :rules="[(value) => required(value, 'ایمیل'), checkMail]"
      ></v-text-field>

      <v-text-field
        class="mx-3"
        v-model="form.password"
        outlined
        label="رمز عبور"
        :rules="[
          (value) => required(value, 'پسورد'),
          (value) =>
            value.length >= 8 || 'طول پسورد باید بیشتر از 8 کاراکتر باشد',
        ]"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-card-actions>
        <v-btn
          depressed
          color="primary"
          class="mr-1"
          :loading="loading"
          :disabled="loading"
          @click="submitForm"
        >
          ورود
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { required, checkMail, checkPassword } from "@/components/validation.js";
export default {
  data: () => ({
    showPassword: false,
    form: {
      email: "",
      password: "",
    },
    loading: false,
    required,
    checkMail,
    checkPassword,
  }),
  methods: {
    submitForm() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        localStorage.setItem("user", JSON.stringify(this.form));
        setTimeout(() => {
          this.loading = false;
          this.$router.replace({ name: "Dashboard" });
        }, 2000);
      }
    },
  },
  mounted() {
    this.$refs.mailInput.focus();
  },
};
</script>

<style></style>
