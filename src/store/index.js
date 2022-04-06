import { createStore } from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
const store = createStore({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

export default store