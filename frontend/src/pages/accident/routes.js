import view from './view'
import edit from './view/edit'
import all from './view/all'

const routes = [
  {
    path: '/accident/edit',
    component: edit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/accident/all',
    component: all,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/accident/create',
    component: edit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/accident/:accidentId',
    component: view,
    meta: {
      requireAuth: true
    }
  }
]

export default routes