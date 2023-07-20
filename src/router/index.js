import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import profileView from '../views/pf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vuePractice',
      component: () => import('../views/PracticeVue.vue')

    },

    {
    path: '/new',
      name: 'new',
      component: () => import('../views/new.vue')
    },
    {
      path: '/usersdata',
      name: 'usersdata',
      component: () => import('../views/usersdata.vue')
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: profileView
    }
  ]
})

export default router
 