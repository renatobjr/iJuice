<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/store/auth";
import { useSnackbarStore } from "@/store/snackbar";
import { dashboardRoutes } from "@/router/dashboard";
import { authRoutes } from "@/router/auth";
import validator from "@/utils/validator";
import router from "@/router";

const form = ref(null);
const loginData = reactive({
  email: "",
  password: "",
});

const validateForm = async () => {
  const formValidation = await form.value.validate();
  return formValidation.valid;
};

const handleRegister = async () => {
  await router.push({ name: authRoutes.register });
};

const handleLogin = async () => {
  let is = await validateForm();
  if (!is) return;

  const authStore = useAuthStore();
  const result = await authStore.login(loginData);

  if (!result) {
    const snackbarStore = useSnackbarStore();
    snackbarStore.showSnackbar({
      message: "Unable to login. Please check your credentials and try again.",
      color: "error",
    });
    return;
  }

  router.push({ name: dashboardRoutes.dashboard });
};
</script>

<template>
  <v-col cols="6" class="col-background align-center">
    <h1 class="text-center ijuice-title">iJuice</h1>
    <h3 class="text-center ijuice-caption">Juice everywhere</h3>
    <br />
    <p class="text-center ijuice-comercial">
      Discover <strong>iJuice</strong>: order fresh juices online and pick them
      up at our automated machines. No lines, no waiting—just order, stop by the
      nearest machine, and enjoy your juice on the spot!
    </p>
    <br />
    <v-btn
      class="d-flex mx-auto mt-10"
      color="orange-darken-4"
      size="large"
      @click="handleRegister"
    >
      Register
    </v-btn>
  </v-col>
  <v-col cols="6" class="align-center">
    <v-form ref="form" style="margin: 20vh">
      <juice-card>
        <template v-slot:title>Login</template>
        <template v-slot:content>
          <v-text-field
            v-model="loginData.email"
            label="Email"
            variant="outlined"
            :rules="[validator.isRequired]"
          ></v-text-field>
          <v-text-field
            v-model="loginData.password"
            label="Password"
            type="password"
            variant="outlined"
            :rules="[validator.isRequired]"
          ></v-text-field>
        </template>
        <template v-slot:actions>
          <v-btn color="green-darken-4" size="large" @click="handleLogin">
            Login
          </v-btn>
        </template>
      </juice-card>
    </v-form>
  </v-col>
</template>

<style scoped>
.ijuice-title {
  font-size: 10rem !important;
}
.ijuice-caption {
  font-size: 2rem !important;
  color: chocolate;
  margin-top: -50px;
}
.ijuice-comercial {
  font-size: 1.5rem !important;
}
.col-background {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    216deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
.v-col {
  height: 100vh;
  align-content: center;
}
</style>
