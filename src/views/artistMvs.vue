<template>
  <div class="artistMvs">
     <div class="title">
        {{ artist }}'s Music Videos 
     </div>
     <MvRow 
       :items="mvs"
       :columnNumber="5"
     />
     <div 
       class="button"
       v-show="hasMore" >
        <Mybutton @click="() => loadData()">显示更多</Mybutton>
     </div>
  </div>
</template>
<script>
import { fetchArtistMv } from '../api/artist';
import MvRow from '../components/MvRow.vue';
import Mybutton from '../components/Mybutton.vue';
export default {
    name: 'artistMvs',
    components: {MvRow, Mybutton},
    data() {
        return {
            mvs: [],
            hasMore: false,
            artist: '',
            offset: 0
        }
    },
    created() {
        this.loadData();
    },
    methods: {
      loadData(){
        fetchArtistMv({id: this.$route.params.id,limit: 100,offset:this.offset})
          .then(res => {
            this.mvs.push(...res.mvs)
            this.hasMore = res.hasMore
            this.offset += 100;
            if(res.mvs.length) {
              this.artist = res.mvs[0].artist.name
            }
          })
      }   
    }
}
</script>
<style lang="scss" scoped>
  .artistMvs {
    padding: 0 10vw;
    .title {
        font-size: 40px;
        font-weight: 600;
        margin-bottom: 24px;
    }
    .button {
        display: flex;
        justify-content: center;
        margin-top: 24px;
    }
  }
</style>