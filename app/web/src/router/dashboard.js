export const dashboardRoutes = {
  dashboard: 'dashboard',
  orders: 'orders'
}

const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '../views/customer/Dashboard.vue')
const Orders = () => import(/* webpackChunkName: "dashboard" */ '../views/customer/Orders.vue')

export default [
  {
    path: '/dashboard',
    name: dashboardRoutes.dashboard,
    component: Dashboard
  },
  {
    path: '/dashboard/orders',
    name: dashboardRoutes.orders,
    component: Orders
  }
].map((route) => {
  route['meta'] = {
    ...route.meta,
    layout: 'base',
    requiresAuth: true
  }

  return route
})
