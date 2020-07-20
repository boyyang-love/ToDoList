import {
  createRouter,
  createWebHashHistory
} from 'vue-router';
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import("@/views/List.vue")
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router