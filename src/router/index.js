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
        },{
          path: '/hotelOrderInfo',
          name: 'HotelInfo',
          component: ()=> import('../views/HotelOrderInfo.vue')
        },{
            path: '/user/passengers',
            name: 'Passengers',
            component: ()=> import('../views/user/Passengers.vue')
        },
        {
                path: '/search/hotel',
                name: 'SearchHotel',
                component: () => import('../views/Hotel/SearchHotel.vue')
        },
        {
                path: '/search/room',
                name: 'HotelDetails',
                component: () => import('../views/Hotel/HotelDetails.vue')
        },
            {
                path: '/hotelorderprepare',
                name: 'HotelOrderPrepare',
                component: ()=> import ('../views/Hotel/HotelOrderPrepare.vue')
            },
        {
            path: '/ticket',
            name: 'TicketInfo',
            component: ()=> import ('../views/TicketInfo.vue')
        },
        {
            path: '/ticketdetail',
            name: 'TicketDetail',
            component: ()=> import ('../views/TicketDetail.vue')
        },
        {
            path: '/ticketorderprepare',
            name: 'TicketOrderPrepare',
            component: ()=> import ('../views/TicketOrderPrepare.vue')
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
        },{
              path: '/user/hotelorders',
              name: "HotelOrders",
              component: ()=> import('../views/HotelOrderInfo.vue'),
        },{
              path: '/user/foodorders',
              name: 'FoodOrders',
              component: () => import ('../views/user/FoodOrders.vue')
        }
          ]
        },
        {
                path: '/userinfo',
                name: 'Information',
                component: () => import('../views/user/UserInfo.vue'),
        },
        {
            path: '/manage/trips',
            name: 'CreateTrip',
            component: () => import('../views/manager/CreateTrip.vue'),
        },{
                path: '/manage/orders',
                name: 'CreateOrder',
                component: () => import('../views/manager/CreateOrder.vue'),
        },{
            path: '/manage/foods',
            name: 'Foods',
            component: () => import('../views/manager/Food.vue'),
        },
        {
            path: '/message',
            name: 'Message',
            component: () => import('../views/Message.vue'),
        },
        {
            path: '/meal',
            name: 'Meal',
            component: () => import('../views/meal/Meal.vue'),
        },
        {
            path: '/message',
            name: 'Message',
            component: () => import('../views/Message.vue'),
        },
        {
            path: '/payment',
            name: "Payment",
            component: () => import('../views/payment.vue'),
        }
        ]
    },
    {
        path: '/ticketcard',
        name: 'TicketCard',
        component: ()=> import ('../views/TicketCard.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/admin/layout'),
      children: [{
          path: '/admin/main',
          name: 'AdminMain',
          component: () => import('../views/admin/Main'),
      },{
          path: '/admin/main/trip',
          name: 'ManageTrip',
          component: () => import('../views/admin/ManageTrip'),
      },{
          path: '/admin/select',
          name: 'Select'
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
    },{
        path: "/admin/login",
        name: 'AdminLogin',
        component: () => import('../views/admin/Login'),
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
    },


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
