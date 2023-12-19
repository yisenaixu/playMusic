<template>
    <div class="playlist">
       <div class="header">
         <div class="left">
            <Cover showTitle="false" :coverImgUrl="playlist.coverImgUrl"/>
         </div>
         <div class="info">
            <div class="title">{{ playlist.name }}</div>
            <div class="creator">PlayList by {{ playlist.creator?.nickname }}</div>
            <div class="other">最近更新{{updateTime}} | 播放次数{{ playlist.playCount }}</div>
            <div class="detail">{{ playlist.description }}</div>
            <div class="button">
                <Mybutton
                  @click="() => $store.state.player.replacePlaylist(playlist.trackIds)"
                  symbolId="icon-play"
                >播放</Mybutton>

                <Mybutton
                :iconButton="true"
                :symbolId="isLiked ? 'icon-heart-solid' : 'icon-heart'"
                @click="() => LikeAPlaylist({ id:playlist.id, t:isLiked ? 2 : 1 })"
                >
                </Mybutton>
                
                <Mybutton
                :iconButton="true"
                >...
                </Mybutton>
            </div>
         </div>
       </div>
       
       <TrackList :songs="songs" type="playlist"/>
       <div v-if="haveMore" class="button">
          <button @click="loadmore">加载更多</button>
       </div>
    </div>
</template>

<script>
import {getSongListDetail} from '../api/playlist'
import TrackList from '../components/TrackList.vue';
import Cover from '../components/Cover.vue';
import { getPartTrack } from '../utils/songlist';
import {transformDate} from '../utils/common'
import Mybutton from '../components/Mybutton.vue';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'playlist',
    data() {
        return {
            offset: 0,
            playlist: {},
            songs: {}
        };
    },
    computed:{
        ...mapState(['liked']),
        playlistCount() {
            return this.playlist.trackCount;
        },
        trackCount() {
            return this.songs.length
        },
        updateTime() {
            return transformDate(this.playlist.updateTime)
        },
        haveMore() {
            return this.playlistCount > this.trackCount
        },
        likedPlaylistIds() {
            return this.liked.playlists.map(playlist => playlist.id)
        },
        isLiked() {
            return this.likedPlaylistIds.includes(this.playlist.id)
        }

    },
    mounted() {
        getSongListDetail(this.$route.params.id).then(res => {
            this.playlist = res.playlist;

            //歌单所有歌曲id转化
            this.playlist.trackIds = this.playlist.trackIds
                                       .map(item => item.id)
            console.log('歌单歌曲id:',this.playlist.trackIds);
        });
        getPartTrack(this.$route.params.id, this.offset).then(res => {
            console.log('1','挂载');
            this.songs = res.songs;
            this.offset += 50;
        })
    },
    methods: {
        ...mapActions(['LikeAPlaylist']),
        loadmore() {
            getPartTrack(this.$route.params.id, this.offset).then(res => {
            console.log(res);
            this.songs = [...this.songs,...res.songs];
            console.log(this.songs);
            this.offset += 50;
        })
        }
    },
    components: { Cover, TrackList, Mybutton }
}
</script>
<style scoped>
.playlist {
    padding: 0 10vw;
    display: flex;
    flex-direction: column;
  }
.header {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 100px;
    margin-bottom: 64px;
}
.left {
    width: 100%;
    min-width: 400px;
}
.info {
   min-height: 200px;
   min-width: 400px;
   padding: 16px;
   overflow: hidden;
}
.info .title {
    font-size: 32px;
    font-weight: 1000;
}
.info .creator {
    font-size: 16px;
    font-weight: 300;
    margin-top: 32px;
}
.info .other {
    font-size: 14px;
    font-weight: 200;
}
.info .detail {
    font-size: 14px;
    font-weight: 400;
    margin-top: 48px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.button {
    margin-top: 80px;
    display: flex;
    justify-content: start;
}
</style>