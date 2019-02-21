import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from './pages'
import store from './store'

Vue.use(VueRouter)

let routes = []

for(const page of pages) {
  let routesModule = require(`./pages/${page}/routes.js`)
  routes = routes.concat(routesModule.default)
}

routes.push(
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/404'
  }
)

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