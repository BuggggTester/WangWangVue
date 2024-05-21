import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('../layout'),
        children: [{
          path: '/main',
          name: 'Main',
          component: () => import('../views/Main'),
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('../views/user/User.vue'),
          children: [{
              path: '/user/orders',
              name: 'Orders',
              component: () => import('../views/user/Orders.vue'),
        }, {
              path: '/user/notdeparture',
              name: 'NotDeparture',
              component: () => import('../views/user/NotDeparture.vue'),
        },{
              path: '/user/unfinished',
              name: 'Unfinished',
              component: () => import('../views/user/Unfinished.vue'),
        }
          ]
        }
        ,{
            path: '/manage/trips',
            name: 'CreateTrip',
            component: () => import('../views/manager/CreateTrip.vue'),
        },{
                path: '/manage/orders',
                name: 'CreateOrder',
                component: () => import('../views/manager/CreateOrder.vue'),
            }
        ]
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/test.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
