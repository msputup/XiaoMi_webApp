const MiLogin = () => import('./MiLogin.vue')
const MiHome = () => import('./MiHome.vue')
const MiCategory = () => import('./MiCategory.vue')
const MiCart = () => import('./MiCart.vue')
const MiUser = () => import('./MiUser.vue')
const ProductList = () => import('./ProductList.vue')
const ProductDetail = () => import('./ProductDetail.vue')
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
  },
  {
    path: '/commodity/list/:id',
    name: 'productList',
    component: ProductList
  },
  {
    path: '/commodity/detail/:id',
    name: 'ProductDetail',
    component: ProductDetail
  }
]
