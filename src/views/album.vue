<template>
    <div class="album">
       <div class="header">
         <div class="left">
            <Cover showTitle="false" :coverImgUrl="album.picUrl"/>
         </div>
         <div class="info">
            <div class="title">{{ album.name }}</div>
            <div class="creator">Album by {{ album.artist?.name }}</div>
            <div class="other">Publish {{publishTime}}·{{ trackCount }}首歌,  </div>
            <div class="detail">{{ album.description }}</div>
            <div class="button">
                <Mybutton
                  symbolId="icon-play"
                >播放</Mybutton>

                <Mybutton
                :iconButton="true"
                symbolId="icon-heart"
                >
                </Mybutton>
                
                <Mybutton
                :iconButton="true"
                >...
                </Mybutton>
            </div>
         </div>
       </div>
       
       <TrackList :songs="songs" type="album"/>
       <div class="publishDate"> 发行于 {{publishTime}} </div>
       <div class="release">© {{ album.company }}</div>
       <div class="more">
          <div class="title">More By {{ album.artist?.name }}</div>
          <CoverRow :items="moreAlbums" type="album"/>
       </div>
       <!-- <div v-if="haveMore" class="button">
          <button @click="loadmore">加载更多</button>
       </div> -->
    </div>
</template>

<script>
import Mybutton from '../components/Mybutton.vue';
import TrackList from '../components/TrackList.vue';
import Cover from '../components/Cover.vue';
import CoverRow from '../components/CoverRow.vue';
// import { getPartTrack } from '../utils/songlist';
import {transformDate} from '../utils/common'
import { fetchAlbumDetail } from '../api/album';
import { fetchArtistAlbums} from '../api/artist'
import { nextTick } from 'vue';
export default {
    name: 'playlist',
    data() {
        return {
            offset: 0,
            album: {},
            songs: {},
            moreAlbums: [],
        };
    },
    computed: {
        playlistCount() {
            return this.playlist.trackCount;
        },
        trackCount() {
            return this.songs.length
        },
        publishTime() {
            return transformDate(this.album.publishTime)
        },
        haveMore() {
            return this.playlistCount > this.trackCount
        } 
    },
    mounted() {
       this.loadData(this.$route.params.id);
    },
    beforeRouteUpdate(to, from) {
       this.loadData(to.params.id);
       return true;
    },
    methods: {
        async loadData(id) {
            await fetchAlbumDetail(id).then(res => {
            this.album = res.album;
            this.songs = res.songs;
            });
            await nextTick();
            fetchArtistAlbums(this.album?.artist?.id, 5).then(res => {
                this.moreAlbums = res.hotAlbums
            })
        }
        
    },
    components: { Cover, TrackList, CoverRow, Mybutton}
}
</script>
<style lang="scss" scoped>
.album {
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
   .title {
    font-size: 32px;
    font-weight: 1000;
     }
     .creator {
    font-size: 16px;
    font-weight: 300;
    margin-top: 32px;
     }
     .other {
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
    .publishDate,.release {
      font-size: 12px;
      font-weight: 200;
   }
   .publishDate {
    margin-top: 16px;
   }
   .more {
    margin-top: 48px;
    border-top: 1px solid var(--color-secondary-bg-for-transparent);
    .title {
        margin: 24px 0;
        font-size: 24px;
        font-weight: 600;
    }
   }
  }

  .button {
    margin-top: 80px;
    display: flex;
    justify-content: start;
}
</style>