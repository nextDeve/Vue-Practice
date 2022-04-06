import { createRouter, createWebHashHistory } from 'vue-router';
import { removeToken } from '@/utils/token'
import store from '@/store';
import routes from './routers';
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})
router.beforeEach((to, from, next) => {
    let name = store.state.user.userInfo.name
    let token = store.state.user.token;
    if (token) {
        if (to.path === '/login' || to.path === '/register') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                store.dispatch('getUserInfo').then(() => next()).catch(() => {
                    removeToken()
                    next('/login')
                })
            }
        }
    } else {
        let logOutRejectRouter = ['/pay', '/paysuccess', '/trade', '/center', '/center/myorder', '/center/grouporder'];
        if (logOutRejectRouter.some((item) => item === to.path)) {
            next(`/login?redirect=${to.fullPath}`)
        } else next()
    }
})


export default router;