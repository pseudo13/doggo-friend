import DoggoDetailsVue from '@/components/DoggoDetails.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RamdomDoggoImages from "@/views/RandomDoggos.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/doggo-details/:id',
    name: 'doggo-details',
    component: DoggoDetailsVue
  }, {
    path: '/random',
    name: 'random',
    component: RamdomDoggoImages
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
