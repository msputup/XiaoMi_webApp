const MiLogin = () => import('./MiLogin.vue')
const MiHome = () => import('./MiHome.vue')
const MiCategory = () => import('./MiCategory.vue')
const MiCart = () => import('./MiCart.vue')
const MiUser = () => import('./MiUser.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: MiHome
  },
  {
    path: '/category',
    name: 'category',
    component: MiCategory
  },
  {
    path: '/cart',
    name: 'cart',
    component: MiCart
  },
  {
    path: '/user',
    name: 'user',
    component: MiUser
  },
  {
    path: '/login',
    name: 'login',
    component: MiLogin
  }
]
