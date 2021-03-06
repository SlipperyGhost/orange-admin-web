import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/detail'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree')
  //     }
  //   ]
  // },

  {
    path: '/ap-dp',
    component: Layout,
    redirect: '/ap-dp/ap-index',
    name: 'APDP',
    meta: { title: 'AP/DP', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ap-index',
        name: 'APIndex',
        component: () => import('@/views/ap'),
        meta: { title: 'AP List', icon: 'el-icon-mouse' }
      },
      {
        path: 'ap-detail/:id',
        hidden: true,
        name: 'ApDetail',
        component: () => import('@/views/ap/apDetail'),
        meta: { title: 'AP Detail', icon: 'form' }
      },
      {
        path: 'model-detail/:did/:method',
        hidden: true,
        name: 'APModelDetail',
        component: () => import('@/views/ap/modelDetail'),
        meta: { title: 'AP Model Detail', icon: 'form' }
      },
      {
        path: 'dp-index',
        name: 'DPIndex',
        component: () => import('@/views/dp'),
        meta: { title: 'DP List', icon: 'nested' }
      },
      {
        path: 'dp-detail/:id',
        name: 'DpDetail',
        hidden: true,
        component: () => import('@/views/dp/dpDetail'),
        meta: { title: 'DP Detail', icon: 'form' }
      },
      {
        path: 'dateset-detail/:did/:method',
        hidden: true,
        name: 'DPDatesetDetail',
        component: () => import('@/views/dp/modelDetail'),
        meta: { title: 'DP Dateset Detail', icon: 'form' }
      }
    ]
  },
  {
    path: '/label',
    component: Layout,
    redirect: '/label/ap-label-index',
    name: 'Label',
    meta: { title: 'Label', icon: 'el-icon-paperclip' },
    children: [
      {
        path: 'ap-label-index',
        name: 'APLabelIndex',
        component: () => import('@/views/lables'),
        meta: { title: 'AP Label List', icon: 'el-icon-s-data' }
      },
      {
        path: 'ap-label-detail/:label',
        name: 'APLabelDetail',
        hidden: true,
        component: () => import('@/views/lables/labelDetail'),
        meta: { title: 'Label Detail', icon: 'el-icon-s-flag' }
      },
      {
        path: 'dp-label-index',
        name: 'DPLabelIndex',
        component: () => import('@/views/lables/dpIndex.vue'),
        meta: { title: 'DP Label List', icon: 'form' }
      },
      {
        path: 'dp-label-detail/:label',
        name: 'DPLabelDetail',
        hidden: true,
        component: () => import('@/views/lables/dpLabelDetail'),
        meta: { title: 'Label Detail', icon: 'form' }
      }
    ]
  },
  {
    path: '/data-source',
    component: Layout,
    redirect: '/data-source/data-source-index',
    name: 'DataSource',
    meta: { title: 'Data Source', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'data-source-index',
        name: 'DataSourceIndex',
        component: () => import('@/views/dataSource'),
        meta: { title: 'Data Source List', icon: 'el-icon-s-marketing' }
      }
    ]
  },
  {
    path: '/review',
    component: Layout,
    redirect: '/review/review-index',
    name: 'Review',
    meta: { title: 'Review', icon: 'eleme' },
    children: [
      {
        path: 'review-index',
        name: 'ReviewIndex',
        component: () => import('@/views/review'),
        meta: { title: 'Review List', icon: 'el-icon-eleme' }
      },
      {
        path: 'review-ap-list',
        name: 'ReviewAPList',
        hidden: true,
        component: () => import('@/views/review/ap'),
        meta: { title: 'Review AP List', icon: 'form' }
      },
      {
        path: 'review-ap-detail/:id',
        name: 'ReviewAPDetail',
        hidden: true,
        component: () => import('@/views/review/ap/detail'),
        meta: { title: 'Review AP Detail', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
