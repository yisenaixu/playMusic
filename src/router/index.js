import { createRouter, createWebHistory } from 'vue-router'
import login from "../views/login.vue"
import loginAccount from '../views/loginAccount.vue'
import home from "../views/home.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login/account',
      name: 'loginAccount',
      component: loginAccount
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/explore.vue'),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/library.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue')
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/playlist.vue')
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import('../views/album.vue')
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('../views/artist.vue')
    },
    {
      path: '/artist/:id/mv',
      name: 'artistMvs',
      component: () => import('../views/artistMvs.vue')
    },
    {
      path: '/search',
      component: () => import('../views/Search.vue'),
      props: route => ({query: route.query.q})
    },
    {
      path: '/dailyTracks',
      name: 'dailyTracks',
      component: () => import('../views/dailyTracks.vue')
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: () => import('../views/mv.vue')
    },
    {
      path: '/newAlbums',
      name: 'newAlbums',
      component: () => import('../views/newAlbums.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list.vue'),
      meta: {
        keepAlive: true,
      }
    },
  ],
})


export default router
