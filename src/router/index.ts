import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: () => import('@/layouts/LayoutDefault.vue'),
      meta: {
        auth: true
      },
      children: [
        {
          path: 'checks',
          name: 'checks',
          component: () => import('@/views/checks/CheckPage.vue'),
        },
        {
          path: 'checks/:id',
          name: 'approveOrRejectCheck',
          props: true,
          component: () => import('@/views/checks/ApproveOrRejectCheckPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    }
  ]
})

export default router
