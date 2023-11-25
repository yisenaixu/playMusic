<template>
  <div class="library">
    <h1>
      <img class="avatar" :src="userData.user.avatarUrl" alt="" loading="lazy" />
      {{userData.user.nickname}}的音乐库
    </h1>
    <div class="section-one">
      <div class="flex-wrap">
        <div class="like-songs">
          <div class="lyrics"></div>
          <div class="bottom">
            <div class="text">
              我喜欢的音乐
              <div class="subtext">{{ liked.playlists[0]?.trackCount }}首歌</div>
            </div>
            <div class="button">
              <button @click.stop="() => player.playPlaylistById(liked.playlists[0].id)" class="play-button">
                <svgIcon symbolId="icon-play" className="svgIcon" />
              </button>
            </div>
          </div>
        </div>
        <div class="tracklist">
          <TrackList
            type="tracklist"
            :columnNumber="4"
            :songs="liked.songsDetails"
            :isShowTime="false"
          />
        </div>
      </div>
    </div>
    <div class="section-two">
      <div class="tabs">
        <div class="tab button" :class="{active: currentTab === 'playlist'}" @click="currentTab = 'playlist'">
          {{ playlistSelect[playlistType] }} &nbsp;
          <SvgIcon
            symbolId="icon-arrow-down"
            className="svgIcon"
            @click.stop="(e) => $refs.playlistTabMenu.openMenu(e)"
          />
        </div>
        <div class="tab button" :class="{active: currentTab === 'album'}" @click="currentTab = 'album'">专辑</div>
        <div class="tab button" :class="{active: currentTab === 'artist'}" @click="currentTab = 'artist'">艺人</div>
        <div class="tab button" :class="{active: currentTab === 'mv'}" @click="currentTab = 'mv'">MV</div>
        <div class="tab button" :class="{active: currentTab === 'cloud'}" @click="currentTab = 'cloud'">云盘</div>
        <div class="tab button" :class="{active: currentTab === 'playHistory'}" @click="() => currentTab = 'playHistory'">听歌排行</div>
      </div>
    </div>
    <ContentMenu ref="playlistTabMenu">
      <div class="item" @click="playlistType = 'all',currentTab = 'playlist'" >全部歌单</div>
      <div class="item" @click="playlistType = 'mine',currentTab = 'playlist'">创建的歌单</div>
      <div class="item" @click="playlistType = 'liked',currentTab = 'playlist'">收藏的歌单</div>
    </ContentMenu>
    <div class="tab-content" v-show="currentTab === 'playlist'">
      <CoverRow 
       type="playlist"
       :items="playlists"
      />
    </div>
    <div class="tab-content" v-show="currentTab === 'playHistory'">
      <TrackList
        type="tracklist"
        :songs="liked.playHistory['weekData']"
      />
    </div>
    <div class="tab-content" v-show="currentTab === 'album'">
      <CoverRow 
       type="album"
       :items="liked.albums"
      />
    </div>
    <div class="tab-content" v-show="currentTab === 'artist'">
      <CoverRow 
       type="artist"
       :items="liked.artists"
      />
    </div>
    <div class="tab-content" v-show="currentTab === 'mv'">
    </div>
    <div class="tab-content" v-show="currentTab === 'cloud'">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ContentMenu from "../components/ContentMenu.vue";
import SvgIcon from "../components/SvgIcon.vue";
import TrackList from "../components/TrackList.vue";
import CoverRow from '../components/CoverRow.vue';
export default {
  name: "library",
  components: { TrackList, SvgIcon, ContentMenu, CoverRow },
  data() {
    return {
      playlistSelect: {
        'mine': '创建的歌单',
        'liked': '收藏的歌单',
        'all': '全部歌单'
      },
      playlistType: 'mine', // 'mine' | 'liked' | 'all'
      currentTab: "playlist",
    };
  },
  computed: {
    ...mapState(['liked','userData','player']),
    playlists() {
      if(this.playlistType === 'all') {
        return this.liked.playlists
      } else {
        return this.filterPlaylists
      }
    },
    filterPlaylists() {
      //筛除我喜欢的歌单
      const playlists = this.liked.playlists.slice(1);
      // 用户uid
      const userId = this.userData.user.userId;
      if(this.playlistType === 'mine') {
        this.liked.playlists.filter( item => item.creator.userId === userId)
      } else if(this.playlistType === 'liked'){
        this.liked.playlists.filter( item => item.creator.userId !== userId)
      }
      return playlists;
    }
  },
  created() {
    this.fetchPlayHistory();
    this.fetchLikedSongsDetail();
    this.fetchLikedPlaylist();
    this.fetchLikedAlbums();
    this.fetchLikedArtists();
  },
  methods: {
    ...mapActions(['fetchPlayHistory',
                   'fetchLikedSongsDetail',
                   'fetchLikedPlaylist',
                   'fetchLikedArtists',
                   'fetchLikedAlbums'
                    ]),
  },
};
</script>
<style lang="scss" scoped>
.library {
  padding: 0 10vw;
  min-width: 1320px;
  h1 {
    display: flex;
    align-items: center;
    .avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
  .section-one {
    height: 280px;
    .flex-wrap {
      height: 100%;
      display: flex;
      .like-songs {
        flex: 3;
        margin-right: 20px;
        border-radius: 16px;
        background: var(--color-primary-bg-for-transparent);

        display: flex;
        flex-direction: column;
        .lyrics {
          flex: 1;
        }
        .bottom {
          display: flex;
          padding: 8px;
          .text {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 600;
            color: var(--color-primary);
            .subtext {
              font-size: 16px;
              font-weight: 400;
            }
          }
          .button {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .play-button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50px;
              height: 50px;
              color: white;
              backdrop-filter: blur(8px);
              background: var(--color-primary);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.2s;
            }
          }
        }
      }
      .tracklist {
        flex: 7;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .section-two {
    margin-top: 20px;
    .tabs {
      display: flex;
      .active {
        background-color: var(--color-secondary-bg);
      }
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
  .tab-content {
      min-height: 600px;
    }
}
</style>