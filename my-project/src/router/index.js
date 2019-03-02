import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Msite from '@/components/Msite'
import Order from '@/components/Order'
import Search from '@/components/Search'
import Download from '@/components/Download'
import Food from '@/components/Food'
import Shop from '@/components/Shop'
import ShopDetail from '@/components/Shop/ShopDetail'
import FoodDetail from '@/components/Shop/FoodDetail'
import ConfirmOrder from '@/components/ConfirmOrder'
import ChooseAddress from '@/components/ConfirmOrder/ChooseAddress'
import Payment from '@/components/ConfirmOrder/Payment'
import Remark from '@/components/ConfirmOrder/Remark'
import Invoice from '@/components/ConfirmOrder/Invoice'
import AddAddress from '@/components/ConfirmOrder/ChooseAddress/AddAddress'
import SearchAddress from '@/components/ConfirmOrder/ChooseAddress/AddAddress/SearchAddress'
// 会员卡
import Vipcard from '@/components/Vipcard'
import Vipdescription from '@/components/Vipcard/vipDescription'
import Pay from '@/components/Vipcard/payment'
import Usercart from '@/components/Vipcard/usercart'
// 积分商城
import Chome from "@/components/chome"

import Login from '@/components/Login'
import City from '@/components/City'
import Forget from '@/components/Forget'
import Service from '@/components/Service'
import QuestionDetail from '@/components/QuestionDetail'
// 用户
import Info from '@/components/Profile/Info'
// 收货地址路由
import Address from '@/components/Profile/Info/address'
import Add from '@/components/Profile/Info/add'
import Adddetail from '@/components/Profile/Info/adddetail'

import Balance from '@/components/Balance'
import Detail from '@/components/Balance/detail'
import Points from '@/components/Points'
import Detail1 from '@/components/Points/detail'
import Benefit from '@/components/Benefit'
// 红包
import Hongbao from '@/components/Benefit/hongbao'
import Hbdes from '@/components/Benefit/hongbao/hbdes'
import Exchange from '@/components/Benefit/hongbao/exchange'
import History from '@/components/Benefit/hongbao/history'
// 代金券
import Voucher from '@/components/Benefit/voucher'
import Voucherdes from '@/components/Benefit/voucher/voucherdes'
Vue.use(Router)
export default new Router({
  routes: [{
      path: "/",
      name: "Home",
      component: Home
    },{
    path: "/chome",
      name: "Chome",
      component: Chome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children:[
        {
           path: '/profile/info',
             name: 'Info',
             component: Info,
             children:[
               {path: '/profile/info/add',
                 name: 'Add',
                 component: Add,
                },
                {path: '/profile/info/adddetail',
                  name: 'Adddetail',
                  component: Adddetail,},
                  {
                    path: '/profile/info/address',
                    name: 'Address',
                    component: Address,
                  }
             ]
        }
      ]
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance,
      children: [{
        path: "/balance/detail",
        name: "Detail",
        component: Detail
      }]
    },
    {
      path: "/points",
      name: "Points",
      component: Points,
      children: [{
        path: "/points/detail",
        name: "Detail1",
        component: Detail1,
      }]
    },
     {
       path: "/benefit",
       name: "Benefit",
       redirect: "/benefit/hongbao",
       component: Benefit,
       children: [{
           path: "/benefit/hongbao",
           name: "Hongbao",
           component: Hongbao,
           children: [{
               path: "/benefit/hongbao/hbdes",
               name: "Hbdes",
               component: Hbdes,
             },
             {
               path: "/benefit/hongbao/exchange",
               name: "Exchange",
               component: Exchange,
             },
              {
               path: "/benefit/hongbao/history",
               name: "History",
               component: History,
             },
           ]
         },
         {
           path: "/benefit/voucher",
           name: "Voucher",
           component: Voucher,
           children: [{
             path: "/benefit/voucher/voucherdes",
             name: "Voucherdes",
             component: Voucherdes,
           }]
         }
       ]
     },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/msite',
      name: 'Msite',
      component: Msite
    },
    {
      path: '/vipcard',
      name: 'Vipcard',
      component: Vipcard,
      children: [{
          path: "/vipcard/vipdescription",
          name: "Vipdescription",
          component: Vipdescription
        },
        {
          path: "/vipcard/payment",
          name: "Pay",
          component: Pay
        },
        {
          path: "/vipcard/usercart",
          name: "Usercart",
          component: Usercart
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/city/:id',
      name: 'City',
      component: City
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      children: [{
        path: '/service/questionDetail',
        name: 'QuestionDetail',
        component: QuestionDetail,
      }]
    },
    {
      path: '/download',
      name: 'Download',
      component: Download,
    },
    {
      path: '/food',
      name: 'Food',
      component: Food,
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children: [{
          path: '/shop/shopDetail',
          name: 'ShopDetail',
          component: ShopDetail,
        },
        {
          path: '/shop/foodDetail',
          name: 'FoodDetail',
          component: FoodDetail,
        },
      ]
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
      children: [{
        path: '/ConfirmOrder/ChooseAddress',
        name: 'ChooseAddress',
        component: ChooseAddress,
        children: [{
          path: '/ConfirmOrder/ChooseAddress/AddAddress',
          name: 'AddAddress',
          component: AddAddress,
          children: [{
            path: "/ConfirmOrder/ChooseAddress/AddAddress/SearchAddress",
            name: 'SearchAddress',
            component: SearchAddress,
          }]
        }]
      }, {
        path: '/ConfirmOrder/payment',
        name: 'Payment',
        component: Payment,
      },{
        path: '/ConfirmOrder/remark',
        name: 'Remark',
        component: Remark,
      }, {
        path: '/ConfirmOrder/invoice',
        name: 'Invoice',
        component: Invoice,
      }, ]
    }
  ]
})
