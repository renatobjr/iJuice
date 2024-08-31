import { useAuthStore } from "@/store/auth";
import axios from "axios";

const BASE_URL = `${process.env.URL_API}/customer`;
let headers = {
  Authorization: `Baerer ${localStorage.getItem(process.env.SESSION_TOKEN)}`
}

const getSession = async (token) => {
  let response = await axios.post(`${BASE_URL}/session`, {}, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  return response;
}

const authService = {
  login: async (payload) => {
    try {
      let response = await axios.get(BASE_URL, { params: payload })
      if (response.status === 200) {
        localStorage.setItem(process.env.SESSION_TOKEN, response.data.success.token);
        useAuthStore().setLoggedUser(response.data.success.customer, response.data.success.token);
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  register: async (payload) => {
    try {
      let response = await axios.post(BASE_URL, payload);
      if (response.status === 201) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  isLogged: async () => {
    try {
      const session = localStorage.getItem(process.env.SESSION_TOKEN);

      if (session) {
        let response = await getSession(session)

        if (response.status === 200) {
          if (response.status === 200) {
            useAuthStore().setLoggedUser(response.data.success.customer, session)
            return true;
          } else {
            return false
          }
        }
      }
    } catch (error) {
      return false
    }
  }
}

export default authService;

