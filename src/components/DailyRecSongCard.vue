<template>
   <div class="card" @click="$router.push({path: '/dailyTracks'})">
      <div class="container">
         <img :src="coverUrl" alt="">
         <div class="title-box">
           <div class="title">
             <div>每</div>
             <div>日</div>
             <div>推</div>
             <div>荐</div>
           </div>
         </div>
         <div class="button-box">
            <button @click.stop="$store.state.player.replacePlaylist(trackIds)">
                <svg-icon symbolId="icon-play" className="svgIcon"></svg-icon>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import ButtonIcon from './ButtonIcon.vue'
import SvgIcon from './SvgIcon.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { ButtonIcon, SvgIcon },
    name: 'DailyRecSongCard',
    computed: {
    ...mapState(['dailyTracks']),
    coverUrl() {
      return `${
        this.dailyTracks[0]?.al.picUrl
      }?param=1024y1024`;
    },
    trackIds() {
      return this.dailyTracks.map(item => item.id)
    }
  },
    methods: {
    ...mapActions(['fetchDailyTracks'])
  },
  created() {
    this.fetchDailyTracks()
  }
}
</script>

<style scoped>
    .card { 
        width: 100%;
        /* border: 1px solid black; */
        cursor: pointer;
        z-index: 1;
    }
    .container {
        border-radius: 16px;
        display: flex;
        position: relative;
        overflow: hidden;
    }
    .container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%; 
        z-index: -1;
        animation: move 38s infinite ;
    }
    .title-box {
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title {
        padding: 16px;
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
    }
    .title div{
       font-size: 32px;
       font-weight: 1000;
    }
    .button-box {
        flex-grow: 2;
        position: relative;
    }
    button {
       position: absolute;
       right: 16px;
       bottom: 16px;
       border: none;
       background: transparent;
       cursor: pointer;
    }
    @keyframes move {
     0% {
        transform: translateY(0);
     }
     100% {
        transform: translateY(-50%);
     }
}
</style>