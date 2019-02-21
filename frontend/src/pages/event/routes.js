import view from './view'
import edit from './view/edit'
import all from './view/all'

const routes = [
  {
    path: '/event/edit/:eventId',
    component: edit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/event/all',
    component: all,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/event/:eventId',
    component: view,
    meta: {
      requireAuth: true
    }
  }
]

export default routes