<template>
    <div class="artist">
       <div class="header">
         <div class="left">
            <Cover showTitle="false" :coverImgUrl="artist.cover" type="artist"/>
         </div>
         <div class="info">
            <div class="name">{{ artist.name }}</div>
            <div class="artists"> 艺人 </div>
            <div class="statistics">{{ artist.musicSize }}首歌,{{ artist.albumSize }}张专辑,{{ artist.mvSize }}个mv  </div>
            <div class="detail">{{ artist.briefDesc }}</div>
            <div class="button"></div>
         </div>
       </div>
       <div class="hot-songs">
         <h1>热门歌曲</h1>
         <TrackList 
           :columnNumber="4"
           type="tracklist"
           :songs="songs"
           :isShowTime="false"
         />
       </div>
       <div class="album">
         <h1>专辑</h1>
         <CoverRow :items="albums" type="album"/>
       </div>
       <div>
         <h1>mv</h1>
       </div>

    </div>
</template>
<script>
import Cover from '../components/Cover.vue'
import CoverRow from '../components/CoverRow.vue'
import TrackList from '../components/TrackList.vue'
import { fetchArtistAlbums, fetchArtistDetail, fetchArtistHotSong } from '../api/artist'
   export default {
    name: 'artist',
    components: {Cover, TrackList, CoverRow},
    data() {
        return {
           artist: {},  
           songs: [],
           albums: [],
        }
    },
    created() {
        fetchArtistDetail(this.$route.params.id).then(res => {
            console.log(res);
            this.artist = res.data.artist
        })
        fetchArtistHotSong(this.$route.params.id).then(res => {
            console.log(res);
            this.songs = res.songs;
        })
        fetchArtistAlbums(this.$route.params.id).then(res => {
           console.log(res);
           this.albums = res.hotAlbums;
        })
    }
   }
</script>
<style lang="scss" scoped>
    .artist {
    padding: 0 10vw;
    display: flex;
    flex-direction: column;
    .header {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 100px;
    margin-bottom: 64px;
    .left {
    width: 100%;
    min-width: 400px;
    }
    .info {
   min-height: 200px;
   min-width: 400px;
   padding: 16px;
   overflow: hidden;
   .name {
    font-size: 32px;
    font-weight: 1000;
     }
     .artists {
    font-size: 16px;
    font-weight: 300;
    margin-top: 32px;
     }
     .statistics {
    font-size: 14px;
    font-weight: 200;
    }
    .detail {
    font-size: 14px;
    font-weight: 400;
    margin-top: 48px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
   }
   }

 }
    }
</style>