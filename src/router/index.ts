import DoggoDetailsVue from '@/components/DoggoDetails.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RamdomDoggoImages from "@/views/RandomDoggos.vue"
import MyDoggos from '@/views/MyDoggos.vue'

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
  }, {
    path: '/my-doggos',
    name: 'my-doggos',
    component: MyDoggos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
