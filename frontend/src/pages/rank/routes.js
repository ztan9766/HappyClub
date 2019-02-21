import view from './view'

const routes = [
  {
    path: '/rank',
    component: view,
    meta: {
      requireAuth: true
    }
  }
]

export default routes