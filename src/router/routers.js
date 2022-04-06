const home = () => import('@/pages/Home');
const Search = () => import('@/pages/Search');
const Register = () => import('@/pages/Register');
const Login = () => import('@/pages/Login');
const Detail = () => import('@/views/Detail')
const AddCartSuccess = () => import('@/views/AddCartSuccess')
const ShopCart = () => import('@/views/ShopCart')
const Trade = () => import('@/views/Trade')
const Pay = () => import('@/views/Pay')
const PaySuccess = () => import('@/views/PaySuccess')
const Center = () => import('@/views/Center')
const MyOrder = () => import('@/views/Center/MyOrder')
const GroupOrder = () => import('@/views/Center/GroupOrder')
export default [
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keyWorld?',
        name: 'search',
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            show: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            show: false
        }
    },
    //重定向
    {
        path: '/detail/:skuid?',
        name: 'detail',
        component: Detail
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/addCartSuccess',
        component: AddCartSuccess
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else next(false)
        }
    },
    {
        path: '/pay',
        component: Pay,
    },
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    {
        path: '/center',
        component: Center,
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'

            }
        ]
    }
]
