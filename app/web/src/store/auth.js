import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import authService from "@/service/auth";

export const useAuthStore = defineStore('auth', () => {
  const loggedUser = reactive({
    id: null,
    name: null,
    email: null,
  });

  const token = ref(null);

  const isLogged = computed(() => token.value !== null);
  const setLoggedUser = (user, token) => {
    loggedUser.id = user.id;
    loggedUser.name = user.name;
    loggedUser.email = user.email;
    token = token;
  }

  const clearLoggedUser = () => {
    loggedUser.id = null;
    loggedUser.name = null;
    loggedUser.email = null;
    token.value = null;
  }

  async function login(data) {
    return await authService.login(data);
  }

  async function register(data) {
    return await authService.register(data);
  }

  function logout() {
    clearLoggedUser();
    localStorage.removeItem(process.env.SESSION_TOKEN);
  }

  return {
    loggedUser,
    token,
    isLogged,

    setLoggedUser,
    clearLoggedUser,
    login,
    register,
    logout
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
