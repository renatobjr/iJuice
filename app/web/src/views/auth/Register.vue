<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/store/auth";
import { useSnackbarStore } from "@/store/snackbar";
import authRoutes from "@/router/auth";
import validator from "@/utils/validator";
import router from "@/router";

const form = ref(null);
const registerData = reactive({
  name: "",
  email: "",
  password: "",
});

const validateForm = async () => {
  const formValidation = await form.value.validate();
  return formValidation.valid;
};

const backLogin = () => {
  router.push("/");
};

const handleRegister = async () => {
  let is = await validateForm();
  if (!is) return;

  let message = "Wow! No you are registered. Please login to continue.";
  let color = "success";

  const authStore = useAuthStore();
  let result = await authStore.register(registerData);

  if (!result) {
    const snackbarStore = useSnackbarStore();
    snackbarStore.showSnackbar({
      message:
        "Registration failed. Please check your credentials and try again.",
      color: "error",
    });
  } else {
    const snackbarStore = useSnackbarStore();
    snackbarStore.showSnackbar({
      message: message,
      color: color,
    });
    await router.push("/");
  }
};
</script>

<template>
  <v-col cols="6" class="align-center">
    <v-form ref="form" style="margin: 20vh">
      <div>
        <v-icon @click="backLogin" icon="mdi-arrow-left" start></v-icon>
        Back
      </div>
      <juice-card>
        <template v-slot:title>Register</template>
        <template v-slot:content>
          <v-text-field
            v-model="registerData.name"
            label="Name"
            variant="outlined"
            :rules="[validator.isRequired]"
          ></v-text-field>
          <v-text-field
            v-model="registerData.email"
            label="Email"
            variant="outlined"
            :rules="[validator.isRequired]"
          ></v-text-field>
          <v-text-field
            v-model="registerData.password"
            label="Password"
            type="password"
            variant="outlined"
            :rules="[validator.isRequired]"
          ></v-text-field>
        </template>
        <template v-slot:actions>
          <v-btn color="orange-darken-4" size="large" @click="handleRegister">
            Register
          </v-btn>
        </template>
      </juice-card>
    </v-form>
  </v-col>
  <v-col cols="6" class="col-background align-center">
    <v-img
      class="d-flex mx-auto"
      src="/juices.png"
      width="200%"
      contain
    ></v-img>
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
  background: rgb(243, 255, 55);
  background: linear-gradient(
    22deg,
    rgba(243, 255, 55, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  );
}
.v-col {
  height: 100vh;
  align-content: center;
}
</style>
