import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import BookView from '@/views/BookView.vue'
// import NewsView from '@/views/NewsView.vue'
// import AboutView from '@/views/AboutView.vue'
// import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: AboutView,
    // },
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: NewsView,
    // },
    // {
    //   path: '/book',
    //   name: 'book',
    //   component: BookView,
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: ContactView,
    // },
    // // {
    // //   path: '/article/:id',
    // //   name: 'article:id',
    // //   component: ContactView,
    // // },
  ],
})

export default router
