<template>
  <div class="mv">
    <div class="video-container">
      <div class="video">
        <video src=""></video>
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
import { fetchMvDetail, simiMv } from '../api/mv';
import Mybutton from '../components/Mybutton.vue';
import MvRow from '../components/MvRow.vue';
export default {
    name: 'mv',
    components: {Mybutton, MvRow},
    data() {
      return {
        mv: {},
        simiMvs: [],
      }
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData(){
        fetchMvDetail(this.$route.params.id)
          .then(res => {
             console.log(res)
             this.mv = res.data;
          })
        simiMv(this.$route.params.id)
          .then(res => {
            console.log(res);
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