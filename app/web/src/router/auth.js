export const authRoutes = {
  login: 'login',
  register: 'register'
}

const Login = () => import(/* webpackChunkName: "auth" */ '../views/auth/Login.vue')
const Register = () => import(/* webpackChunkName: "auth" */ '../views/auth/Register.vue')

export default [
  {
    path: '/',
    name: authRoutes.login,
    component: Login
  },
  {
    path: '/register',
    name: authRoutes.register,
    component: Register
  }
].map((route) => {
  route['meta'] = {
    ...route.meta,
    layout: 'login'
  }

  return route
})
