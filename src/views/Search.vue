<template>
  <div class="search">
    <div class="header">
      <div class="info"><span style="font-size: 24px; font-weight: 600;">{{ this.query }}</span>&nbsp;的相关搜索如下</div>
      <div class="buttons">
        <div class=" button" :class="{active: type === 'all'}" @click="type = 'all'">综合</div>
        <div class=" button" :class="{active: type === 'tracks'}" @click="type = 'tracks'">歌曲</div>
        <div class=" button" :class="{active: type === 'albums'}" @click="type = 'albums'">专辑</div>
        <div class=" button" :class="{active: type === 'artists'}" @click="type = 'artists'">歌手</div>
        <div class=" button" :class="{active: type === 'playlists'}" @click="() => type = 'playlists'">歌单</div>  
      </div>
    </div>
    <div class="content" v-show="type === 'all'">
      <div class="section-1">
        <div class="left">
          <h3>歌手</h3>    
          <CoverRow :items="artists" type="artist" :columnNumber="3" />
        </div> 
        <div class="right">
          <h3>专辑</h3>    
          <CoverRow :items="albums" type="album" :columnNumber="3" />
        </div> 
      </div>  
      <div class="section-2">
        <h3>歌曲</h3>
        <TrackList :songs="tracks" :columnNumber="4" type="tracklist" :isShowTime="false"/>  
      </div>
      <div class="section-3">
        <h3>歌单</h3>
        <CoverRow :items="playlists" type="playlist" />
      </div>
    </div>
    <div class="content" v-show="type === 'tracks'">
      <TrackList :songs="tracks" type="playlist" />
    </div>
    <div class="content" v-show="type === 'albums'">
      <CoverRow :items="albums" type="album" />
    </div>
    <div class="content" v-show="type === 'playlists'">
      <CoverRow :items="playlists" type="playlist" />
    </div>
    <div class="content" v-show="type === 'artists'">
      <CoverRow :items="artists" type="artist"  />
    </div>
  </div>  
</template>

<script>
import CoverRow from '../components/CoverRow.vue'
import TrackList from '../components/TrackList.vue'
import MvRow from '../components/MvRow.vue'
import { search } from '../api/other'
export default {
    name: 'search',
    data() {
        return {
           artists: [],
           albums: [],
           tracks: [],
           playlists: [],
           typeTable: {
              all: 1018,
              musicVideos: 1004,
              tracks: 1,
              albums: 10,
              artists: 100,
              playlists: 1000,
             },
           type: 'all',
        }
    },
    components: { CoverRow, TrackList, MvRow },
    props: ['query'],
    created() {
        this.getData()
    },
    watch: {
      type(newValue, oldValue) {
        if(newValue !== oldValue) {
          this.getData()
        }
      }
    },
    methods: {
        search(type = 'all') {
            return search(this.query,this.typeTable[type],16)
        },
        getData() {
          console.debug(this.query)
          this.search(this.type).then(res => {
            console.log(res)
            if(this.type === 'all') {
              const { artist, album, song, playList }  = res.result
              this.artists = artist?.artists
              this.albums = album?.albums
              this.tracks = song?.songs
              this.playlists = playList?.playLists
            } else {
              const { songs, albums, playlists, artists } = res.result
              this.artists = artists
              this.albums = albums
              this.tracks = songs
              this.playlists = playlists
            }
          })
        }
    }

}
</script>

<style lang="scss" scoped>
.search {
  padding: 0 10vw;
  min-height: calc(100vh - 133px);
  .header {
    .info {
      font-size: 14px;
      font-weight: 200;
    }
    .buttons {
      display: flex;
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 8px 8px;
        padding: 8px 16px;
        border-radius: 10px;
        user-select: none;
        color: var(--color-secondary);
        transition: 0.2s;
        font-size: 20px;
        font-weight: 700; 
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          background-color: var(--color-primary-bg);
          color: var(--color-primary);
        }
      }
      .active {
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
      }
    }
  }
  .content {
    .section-1 {
      display: flex;
      .left {
        flex: 1;
        margin-right: 24px;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>