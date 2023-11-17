<template>
      <div class="login">
        <div class="title"></div>
        <div 
          class="card"
          @mouseover="activeCard = 1"
          @mouseleave="activeCard = 0"
          @click="goAccount"
        >
           <div class="container" :class="{active: activeCard === 1}">
            <div class="info">
              <div class="section-1">登录网易云账号</div>
              <div class="section-2">可访问全部数据</div>
            </div>
            <svg-icon symbolId="icon-arrow-right" className="svg-icon"></svg-icon>
           </div>
        </div>
        <div 
          class="card"
          @mouseover="activeCard = 2"
          @mouseleave="activeCard = 0"
          @click="()=>{}"
          >
            <div class="container" :class="{active: activeCard === 2}">
              <div class="info">
                  <div class="section-1">搜索网易云账号</div>
                  <div class="section-2">只能读取账号公开数据</div>
              </div>
              <svg-icon symbolId="icon-arrow-right" className="svg-icon"></svg-icon>
        
            </div>
        </div>
      </div>
      
</template>


<script>
import SvgIcon from '../components/SvgIcon.vue'
export default {
  components: { SvgIcon },
  data() {
    return {
        activeCard: 0,

    }
  },
  methods: {
    goAccount() {
      this.$router.push({name: 'loginAccount'})
    }
  }       
     }
</script>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px);
  }
  .card {
    width: 300px;
    height: 128px;
    background: #eaeffd;
    padding: 8px;
    margin: 20px 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .card .container {
    display: flex;
    align-items: center;
  }
  .card .svg-icon {
    width: 20px;
    height: 20px;
    opacity: 0;
    margin-left: 16px;
    color: #335eea;
    transition: all 0.3s;
  }
  .card .info {
    transition: all 0.3s;
  }
  .card .info .section-1 {
    color: #335eea;
    font-size: 24px;
    font-weight: bolder;
  }
  .card .info .section-2 {
    color: rgba(51, 94, 234, 0.78);
    font-size: 14px;
    font-weight: 300;
    text-indent: 4px;
  }
  .active .svg-icon {
    transform: translateX(8px);
    opacity: 1;
  }
  .active .info {
    transform: translateX(-8px);
  }
</style>