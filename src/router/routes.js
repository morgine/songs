const routes = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/register',
        component: () => import('pages/Register.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/main',
        component: () => import('pages/Main.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/admin/Settings.vue')
      },
      {
        path: '/dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: '/apps',
        component: () => import('pages/apps/Index.vue')
      },
      {
        path: '/user-tag',
        component: () => import('pages/apps/Tag.vue')
      },
      {
        path: '/summary',
        component: () => import('pages/apps/UserSummary.vue')
      },
      {
        path: '/statistics',
        component: () => import('pages/statistics/Index.vue')
      },
      {
        path: '/menus',
        component: () => import('pages/menus/Index.vue')
      },
      {
        path: '/advert',
        component: () => import('pages/advert/Index.vue')
      },
      {
        path: '/pictures',
        component: () => import('pages/images/Images.vue')
      },
      {
        path: '/subscribes',
        component: () => import('pages/subscribes/Index.vue')
      },
      {
        path: '/app-groups',
        component: () => import('pages/app-group/Index.vue')
      },
      {
        path: '/subscribe-msgs',
        component: () => import('pages/subscribe-msgs/Index.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
