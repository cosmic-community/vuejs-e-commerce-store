import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'
import Collection from './views/Collection.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products/:slug', component: ProductDetail, props: true },
  { path: '/collections/:slug', component: Collection, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')