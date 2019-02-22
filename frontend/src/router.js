import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import login from './pages/login'
import pageNoFound from './pages/pageNoFound'
import pigeonHouse from './pages/pigeonHouse'

Vue.use(VueRouter)

let routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/pigeonHouse',
    component: pigeonHouse
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: pageNoFound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth) && store.state.token === '') {
    next('/login')
  } else {
    next()
  }
})

export default router