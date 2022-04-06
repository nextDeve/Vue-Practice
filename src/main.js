import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from "./components/TypeNav/index.vue";
import store from './store/index.js'
import 'swiper/css/swiper.css'
import Carousel from './components/Carousel/index.vue'
import Pagenation from './components/Pagination/index.vue'
import 'view-design/dist/styles/iview.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyload from 'vue3-lazy'
import dog from './assets/1.jpg'

let app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueLazyload, {
    loading: dog,
    error: dog
})
app.component('TypeNav', TypeNav)
app.component('Carousel', Carousel)
app.component('Pagenation', Pagenation)

app.mount('#app')
