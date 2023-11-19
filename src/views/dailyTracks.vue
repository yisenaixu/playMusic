<template>
  <div class="dailyTracks">
    <div class="header">
      <div class="title"> 每日歌曲推荐 </div>
      <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
    </div>
    <TrackList 
      type="playlist"
      :songs="dailyTracks"
    />
  </div>    
</template>
<script>
import TrackList from '../components/TrackList.vue';
import { mapState,mapActions } from 'vuex';
export default {
  name: 'dailyTracks',
  components: { TrackList,},
  computed: {
    ...mapState(['dailyTracks']),
  },
  methods: {
    ...mapActions(['fetchDailyTracks'])
  },
  created() {
    this.fetchDailyTracks()
  }
}
</script>
<style lang="scss" scoped>
  .dailyTracks {
    padding: 0 10vw;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 550px;
        @keyframes letterSpacing6 {
           from {
             letter-spacing: 0px;
         }
            to {
              letter-spacing: 6px;
         }
        }
        @keyframes letterSpacing2 {
           from {
             letter-spacing: 0px;
         }
            to {
              letter-spacing: 2px;
         }
        }
        .title {
            font-size: 88px;
            font-weight: 600;
            letter-spacing: 6px;
            animation: letterSpacing6 0.8s;
            background-image: linear-gradient(to right,#dd2476, #ff512f);
            color: transparent;
            -webkit-background-clip: text;
        }
        .subtitle {
            margin-top: 24px;
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 2px;
            animation: letterSpacing2 0.8s;
        }
    }
  }
</style>