<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Player from './components/Player.vue';
import store from './store';
onMounted(() => {
  store.dispatch('fetchLikedSongs')
  store.dispatch('fetchLikedAlbums')
  store.dispatch('fetchLikedArtists')
  store.dispatch('fetchLikedPlaylist')
  store.dispatch('fetchLikedMVs')
  console.debug('获取喜欢的内容')
})
</script>

<template>
      <NavBar></NavBar>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      <Player></Player>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
