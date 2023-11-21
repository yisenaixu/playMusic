<template>
    <div class="newAlbums">
        <div class="title">新专速递</div>
        <div class="albums">
          <CoverRow 
            type="album"
            :items="albums"
          />
        </div>
        <div 
          class="button"
          v-show="hasMore" >
          <Mybutton @click="() => loadData()">显示更多</Mybutton>
     </div>
    </div>
</template>
<script>
import { fetchNewAlbums } from '../api/album';
import CoverRow from '../components/CoverRow.vue';
import Mybutton from '../components/Mybutton.vue';
export default {
    name: 'newAlbums',
    components: {CoverRow, Mybutton},
    data(){
        return {
            limit: 100,
            offset: 0,
            albums: [],
            total: 500,
        }
    },
    created() {
        this.loadData();
    },
    computed: {
      hasMore(){
        return this.albums.length < this.total
      }  
    },
    methods: {
      loadData(){
        return fetchNewAlbums({limit: this.limit, offset: this.offset})
          .then(res => {
            console.log(res);
            this.total = res.total
            this.offset += this.limit
            this.albums.push(...res.albums)
          })
      }  
    }
}
</script>
<style lang="scss" scoped>
.newAlbums {
    padding: 0 10vw;
    .title {
        font-size: 60px;
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