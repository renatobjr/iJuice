/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import authService from '@/service/auth'
import auth, { authRoutes } from './auth'
import dashboard from './dashboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...auth,
    ...dashboard
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0, behavior: 'smooth' };
  }
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const { isLogged } = authStore;

  if (!isLogged && to.meta.requiresAuth) {
    const verifyToken = await authService.isLogged();
    if (!verifyToken) {
      return { name: authRoutes.login }
    }
  }
})

export default router
