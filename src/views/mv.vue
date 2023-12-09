<template>
  <div class="mv">
    <div class="video-container">
      <div class="video">
        <video ref="videoRef" class="plyr"></video>
      </div>
      <div class="video-info">
        <div class="title">{{ mv.artistName }}-{{ mv.name }}
          <div class="button">
            <Mybutton :iconButton="true" symbolId="icon-heart"></Mybutton>
            <Mybutton>...</Mybutton>
          </div>
        </div>
        <div class="count-time">{{ mv.commentCount }} views·{{ mv.publishTime }}</div>
      </div>
    </div>
    <div class="other-mvs">
        <div class="title">更多视频</div>
        <MvRow :items="simiMvs" :columnNumber="5" :showTime="false"/>
    </div>
  </div>
</template>
<script>
import { fetchMvDetail, fetchMvUrl, simiMv } from '../api/mv';
import Mybutton from '../components/Mybutton.vue';
import MvRow from '../components/MvRow.vue';
import { mapState } from 'vuex';
import Plyr from 'plyr';
import '../assets/css/plyr.css'
export default {
    name: 'mv',
    components: {Mybutton, MvRow},
    data() {
      return {
        mv: {},
        simiMvs: [],
        videoPlayer: null,
      }
    },
    mounted() {
      const options = {
        settings: ['quality'],
        autoplay: false,
        quality: {
        default: 1080,
        options: [1080, 720, 480, 240],
        }
      }
      if(this.$route.query.autoplay === true) options.autoplay = true
      this.videoPlayer = new Plyr(this.$refs.videoRef,options)
      this.videoPlayer.volume = this.player.volume
      this.videoPlayer.on('playing', () => {
        this.player.pause();
      });
      this.loadData();
    },
    computed: {
      ...mapState(['player']),
      id() {
        return this.$route.params.id
      }
    },
    methods:{
      loadData(){
        fetchMvDetail(this.id)
          .then(res => {
             this.mv = res.data;
             let requests = res.data.brs.map(br => {
               return fetchMvUrl({ id:this.id, r: br.br })
             })
             Promise.all(requests).then(mvs => {
              let sources = mvs.map(mv => {
                return {
                  src: mv.data.url,
                  type: 'video/mp4',
                  size: mv.data.r,
                }
              })
              this.videoPlayer.source = {
                type: 'video',
                sources,
                title: this.mv.name,
              }  
             })
          })
        simiMv(this.$route.params.id)
          .then(res => {
            this.simiMvs = res.mvs
          })
      }
    }
}
</script>
<style lang="scss" scoped>
  .mv {
    padding: 0 10vw;
    .video-container {
        margin-bottom: 36px;
        .video {
          margin-bottom: 32px;
        }
        .video-info {
            .title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 8px;

                display: flex;
                .button {
                    display: flex;
                    margin-left: 24px;
                }
            }
            .count-time {
                font-size: 12px;
                font-weight: 300;
            }
        }
    }
    .other-mvs {
        .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
        }
    }
  }
</style>