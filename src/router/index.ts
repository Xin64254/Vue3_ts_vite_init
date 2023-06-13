import { createRouter, createWebHashHistory } from 'vue-router'

import homeRoutes from './home'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('view/error/not-found.vue')
    },
    {
      path: '/test',
      component: () => import('view/test.vue')
    },
    ...homeRoutes
  ]
})

export default router
