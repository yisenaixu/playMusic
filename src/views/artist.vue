<template>
  <div class="artist">
    <div class="header">
      <div class="left">
        <Cover showTitle="false" :coverImgUrl="artist.cover" type="artist" />
      </div>
      <div class="info">
        <div class="name">{{ artist.name }}</div>
        <div class="artists">艺人</div>
        <div class="statistics">
          {{ artist.musicSize }}首歌,{{ artist.albumSize }}张专辑,{{
            artist.mvSize
          }}个mv
        </div>
        <div class="detail">{{ artist.briefDesc }}</div>
        <div class="button">
          <Mybutton 
          @click="$store.state.player.replacePlaylist(songsId)"
          symbolId="icon-play"> 播放 </Mybutton>
          <Mybutton 
          @click="() => LikeAArtist({ id:artist.id, t:isLiked ? 2 : 1 })"
          > 
            {{ isLiked ? '取消关注' : '关注' }}
          </Mybutton>
          <Mybutton :iconButton="true">... </Mybutton>
        </div>
      </div>
    </div>
    <div class="hot-songs">
      <h1>热门歌曲</h1>
      <TrackList
        :columnNumber="4"
        type="tracklist"
        :songs="limitSongs"
        :isShowTime="false"
      />
      <div class="button">
         <span v-if="songsLimit === 16" @click="songsLimit = 32">显示更多</span>
         <span v-else @click="songsLimit = 16">收起</span> 
      </div>
    </div>
    <div class="album">
      <h1>专辑</h1>
      <CoverRow :items="albums" type="album" />
    </div>
    <div class="mv">
      <div class="mv-header">
        <h1>MVs</h1>
        <router-link
          class="seeMore"
          v-show="hasMoreMv"
          :to="`/artist/${$route.params.id}/mv`"
          >查看全部</router-link
        >
      </div>
      <MvRow :items="mvs" columnNumber="5" />
    </div>
  </div>
</template>
<script>
import Cover from "../components/Cover.vue";
import CoverRow from "../components/CoverRow.vue";
import TrackList from "../components/TrackList.vue";
import Mybutton from "../components/Mybutton.vue";
import MvRow from "../components/MvRow.vue";
import {
  fetchArtistAlbums,
  fetchArtistDetail,
  fetchArtistHotSong,
  fetchArtistMv,
} from "../api/artist";
import { mapActions, mapState } from 'vuex';
export default {
  name: "artist",
  components: { Cover, TrackList, CoverRow, Mybutton, MvRow },
  data() {
    return {
      artist: {},
      songs: [],
      songsId: [],
      songsLimit: 16,
      albums: [],
      mvs: [],
      hasMoreMv: false,
    };
  },
  computed: {
    ...mapState(['liked']),
    limitSongs() {
      return this.songs.slice(0, this.songsLimit);
    },
    likedArtistIds() {
            return this.liked.artists.map(artist => artist.id)
    },
    isLiked() {
            return this.likedArtistIds.includes(this.artist.id)
    }
  },
  methods: {
    ...mapActions(['LikeAArtist'])
  },
  created() {
    fetchArtistDetail(this.$route.params.id).then((res) => {
      console.log(res);
      this.artist = res.data.artist;
    });
    fetchArtistHotSong(this.$route.params.id).then((res) => {
      console.log(res);
      this.songs = res.songs;
      this.songsId = this.songs.map(item => item.id)
    });
    fetchArtistAlbums(this.$route.params.id).then((res) => {
      console.log(res);
      this.albums = res.hotAlbums;
    });
    fetchArtistMv({ id: this.$route.params.id, limit: 10 }).then((res) => {
      console.debug(res);
      this.mvs = res.mvs;
      this.hasMoreMv = res.hasMore;
    });
  },
};
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
      .button {
        margin-top: 80px;
        display: flex;
        justify-content: start;
      }
    }
  }
  .hot-songs {
    .button {
      margin-top: 10px;
      margin-left: 10px;
      font-size: 12px;
      font-weight: 200;
      cursor: pointer;
    } 
  } 
  .mv {
    .mv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 16px;
      .seeMore {
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
}
</style>