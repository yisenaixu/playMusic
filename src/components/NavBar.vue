<template>
  <div>
      <nav>
        <div class="navigateButtons">
           <button-icon @click="back">
              <svg-icon symbolId="icon-arrow-left" className="svgIcon" ></svg-icon>
           </button-icon>
           <button-icon @click="go">
              <svg-icon symbolId="icon-arrow-right" className="svgIcon" ></svg-icon>
           </button-icon>
        </div>
       <div class="navigateLinks">
          <router-link to="/" :class="{active: $route.name === 'home'  }">首页</router-link>
          <router-link to="/explore"  :class="{active: $route.name === 'explore' }">发现</router-link>
          <router-link to="/library"  :class="{active: $route.name === 'library' }">音乐库</router-link>
       </div>
       <div class="searchBox">
         <div class="searchBox-container" :class="{active:inputFocus}">
          <svg-icon symbolId="icon-search" className="svgIcon"></svg-icon>
          <div class="search">
            <input 
               type="text" 
               v-model="input"
               :placeholder="inputFocus ? '' : '搜索'"
               @blur="inputFocus = false"
               @focus="inputFocus = true" 
               @keydown.enter="search"
            />
          </div>
        </div>
        <img class="avatar" :src="avatarUrl" alt="" loading="lazy" @click="showModal">
       </div>
      </nav>
      <content-menu ref="userProfileModal">
         <div v-if="!isLoggedIn()" class="item" @click="goLogin">
              <svg-icon symbolId="icon-login" class="svg-icon"></svg-icon>
              登录
         </div>
         <div v-if="isLoggedIn()" class="item" @click="goSettings">
             <svg-icon symbolId="icon-settings" class="svg-icon"></svg-icon>
              设置
         </div>
         <div v-if="isLoggedIn()" class="item" @click="doLogout">
            <svg-icon symbolId="icon-logout" class="svg-icon" ></svg-icon>
            退出登录
         </div>
      </content-menu>
    </div>
</template>

<script>
import SvgIcon from './SvgIcon.vue';
import ButtonIcon from './ButtonIcon.vue';
import ContentMenu from './ContentMenu.vue';
import { isLoggedIn, doLogout} from '../utils/auth';
import { mapState } from 'vuex';
import { search } from '../api/other';
  export default {
    name: 'NavBar',
    components: {SvgIcon, ButtonIcon,ContentMenu},
    data() {
      return {
             inputFocus: false,
             input: '',
        }
    },
    computed: {
       ...mapState(['userData']),
       avatarUrl() {
        console.log(this.userData?.user?.avatarUrl);
        console.log(this.isLoggedIn);
        return this.userData?.user?.avatarUrl && this.isLoggedIn()
          ? `${this.userData?.user?.avatarUrl}?param=50y50`
          : 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60'
       }
    },
    methods: {
      isLoggedIn() {
        return isLoggedIn()
      },
      showModal(e) {
         this.$refs.userProfileModal.openMenu(e)
      },
      search() {
        this.$router.push({name: 'search', query: {keywords: this.input}})
      },
      doLogout() {
        doLogout()
      },
      goLogin() {
        this.$router.push({
          name: 'login'
        })
      },
      goSettings() {
        this.$router.push({
          name: 'settings'
        })
      },
      go() {
        this.$router.go(1);
      },
      back() {
        this.$router.go(-1);
      }
    }
  }

</script>

<style lang='scss' scoped>
   nav {
    height: 64px;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    min-width: 1320px;
    display: flex;
    padding: 0 10vw;
    justify-content: space-between;
    align-items: center;
    background: var(--color-navbar-bg);
    z-index: 1000;
   }
  .navigateButtons {
    display: flex;
    flex: 1;
  }
  .navigateLinks {
    display: flex;
    justify-content: center;
    flex: 1;
    .active {
      color: var(--color-primary)
    }
  }
  .navigateLinks a{
     display: inline-block;
     border-radius: 10px;
     text-decoration: none;
     font-size: 18px;
     font-weight: 1000;
     padding: 8px;
     margin: 8px;
     color: var(--color-text)
  }
  .navigateLinks a:active{
    transform: scale(0.92);
    transition: all 0.2s;
  }
  .navigateLinks a:hover {
    background: var(--color-secondary-bg-for-transparent);
  }
  .searchBox {
    flex: 1;
    display: flex;
    justify-content: right;
    .active {
    background: var(--color-primary-bg-for-transparent);
    }
  }
  .searchBox-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 32px;
    padding: 12px;
    border-radius: 10px;
    background: var(--color-secondary-bg-for-transparent);
  }
  .search input {
    font-size: 18px;
    font-weight: 600;
    border: none;
    color: var(--color-text);
    background: transparent;
  } 
  .search input:focus-visible {
    outline: none;
  }
  .active input,
  .active .svgIcon {
      opacity: 1;
      color: var(--color-primary);
  }
  .avatar {
    border-radius: 50%;
    height: 32px;
    cursor: pointer;
    margin-left: 8px;
 }

</style>