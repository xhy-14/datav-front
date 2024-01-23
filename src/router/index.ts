import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 路由配置
  {
    path: '/',
    name: 'layout',
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: '/',
        component: () => import("@/views/home/index.vue")
      },
      {
        path: '/account',
        component: () => import("@/views/setting/index.vue")
      },
      {
        path: '/visual',
        component: () => import("@/views/visual/index.vue"),
      },

      {
        path: '/workplace',
        component: () => import("@/views/workplace/index.vue"),
        redirect: '/workplace/project',
        children: [
          {
            path: '/workplace/info',
            component: () => import("@/views/workplace/MyInfo.vue")
          },
          {
            path: '/workplace/data/source',
            component: () => import("@/views/workplace/DataSource.vue")
          },
          {
            path: '/workplace/project',
            component: () => import("@/views/workplace/Project.vue")
          },
          {
            path: '/workplace/data/tables',
            component: () => import("@/views/workplace/Tables.vue")
          },
          {
            path: '/workplace/chart',
            component: () => import("@/views/workplace/Charts.vue")
          },
          {
            path: '/workplace/show',
            component: () => import("@/views/workplace/Show.vue")
          },
          {
            path: '/workplace/data-editor',
            component: () => import("@/views/workplace/DataEditor.vue")
          }
        ]
      },
      {
        path: '/merge',
        component: () => import("@/views/workplace/mergeChart.vue")
      }
    ]
  },

  {
    path: '/login',
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/register',
    component: () => import("@/views/login/RegisterView.vue")
  },
  {
    path: '/forget',
    component: () => import("@/views/login/ForgetView.vue")
  },
  {
    path: '/chart',
    component: () => import("@/views/chart/Create.vue"),
  },
  {
    path: '/dashboard',
    component: () => import("@/views/workplace/mergeChart.vue")
  },
  {
    path: '/datasource',
    component: () => import("@/views/workplace/DataSource.vue"),
    children: [
      {
        path: '/datasource/add',
        component: () => import("@/views/workplace/AddDataSource.vue")
      }
    ]
  },
  {
    path: '/data-editor',
    component: () => import("@/views/workplace/DataEditor.vue")
  },
  {
    path: '/pay',
    component: () => import("@/views/order/Submit.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
