const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/settings', component: () => import('pages/admin/Settings.vue') },
      { path: '/dashboard', component: () => import('pages/Dashboard.vue') },
      { path: '/apps', component: () => import('pages/apps/Index.vue') },
      { path: '/user-tag', component: () => import('pages/apps/Tag.vue') },
      { path: '/summary', component: () => import('pages/apps/UserSummary.vue') },
      { path: '/statistics', component: () => import('pages/user/Statistics.vue') },
      { path: '/advert', component: () => import('pages/advert/Index.vue') },
      { path: '/pictures', component: () => import('pages/images/Images.vue') },
      { path: '/subscribes', component: () => import('pages/subscribes/Index.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
