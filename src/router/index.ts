import { createRouter, createWebHistory } from 'vue-router'
import RecentScoresView from '@/views/RecentScoresView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'last-scores',
      component: RecentScoresView
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/GameView.vue')
    }
  ]
})

export default router
