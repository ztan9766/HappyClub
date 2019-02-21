import view from './view'
import edit from './view/edit'
import all from './view/all'
import one from './view/one'

const routes = [
  {
    path: '/user/edit',
    component: edit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/all',
    component: all,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/:userId',
    component: one,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user',
    component: view,
    meta: {
      requireAuth: true
    }
  }
]

export default routes