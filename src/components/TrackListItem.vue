<template>
    <div 
      class="track"
      :class="{playlist:type==='playlist',
               album:type==='album',
               tracklist:type==='tracklist',
               highLight:highLight}"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      >
      <div class="left"> 
        <img v-if="type!=='album'" :src="al?.picUrl" alt="">
        <div v-if="type==='album'" class="order">
          <span v-show="!isHover">{{ trackNo }}</span>
          <SvgIcon v-show="isHover" symbolId="icon-play" className="svgIcon"/>
        </div>
        <div class="nameInfo">
            <div class="songName">
                {{ track?.name }}
                 <!--多人唱保留-->
                <!-- <span v-show="type === 'album'" class="arName">
                  -{{ ar.name }}
                </span> -->
            </div>
            <div 
              v-show="type !== 'album'" 
              class="ar"
              >
              {{ ar?.name }}
            </div>
        </div>
      </div>
      <div  v-show="type === 'playlist'" class="al">
        {{al?.name}}
      </div>
      <div v-show="isShowTime" class="time">
        <SvgIcon v-show="isHover" @click="() => player.addTrackToList(this.track.id, true)" symbolId="icon-play" className="svgIcon mr"/>
        <SvgIcon v-show="isHover" @click="() => player.addTrackToList(this.track.id, false)" symbolId="icon-plus" className="svgIcon mr"/>
        <SvgIcon v-show="isHover" :symbolId="isLiked ? 'icon-heart-solid' : 'icon-heart'" className="svgIcon mr" @click="() => LikeATrack({id: track.id,t:isLiked ? 2 : 1 })"/>
        {{ dt }}
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {transformTime} from '../utils/common'
import SvgIcon from './SvgIcon.vue';
  export default {
  components: { SvgIcon },
    name: 'TrackListItem',
    props: {
      track: {
        type: Object,
      }, 
      type: {
        type: String,
        default: 'playlist'
      } ,
      trackNo: {
        type: Number
      },
      isShowTime: {
        type: Boolean,
        default: true
      },
      highLightPlayingTrack: {
        type: Boolean,
        default: true
      },},
    data() {
      return {
        isHover: false,
      }
    },
    computed: {
        ...mapState(['player','liked']),
        al() {
            return this?.track?.al;
        },
        ar() {
            return this?.track?.ar ? this.track.ar[0] : '';
        },
        dt() {
            return transformTime(this?.track?.dt)
            // return this.song.dt
        },
        highLight() {
          return this.player.playing && this.player.currentTrack.id === this.track.id && this.highLightPlayingTrack
        },
        isLiked() {
          return this.liked.songsId.includes(this.track.id)
        }
    },
    methods: {
      ...mapActions(['LikeATrack'])
    }
  }
</script>

<style lang="scss" scoped>

.track {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: var(--color-secondary-bg-for-transparent);
      transition: 0.3s;
    }
    .left,.al,.time {
    flex: 1;
  }
  .left {
    display: flex;
    align-items: center;
    img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 8px;
     }
     .songName {
    font-size: 22px;
    font-weight: 1000;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
       .arName {
          font-size: 14px;
          font-weight: 300;
       }
      }
     .ar {
    font-size: 14px;
    font-weight: 200;
       }
  }
  .al {
    display: flex;
    justify-content: center;

    font-size: 16px;
    font-weight: 200;
}
  .time {
    display: flex;
    justify-content: right;
    align-items: center;

    font-weight: 300;
    .mr {
      margin-right: 32px;
    }
}
.svgIcon {
      color: var(--color-primary);
      &:hover {
         transform: scale(1.23);
         transition: 0.3s;
      }
      &:active {
         transform: scale(0.88);
         transition: 0.3s;
      }
    }
}

.tracklist {
  padding: 10px;
  .left {
    img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 12px;
    border-radius: 8px;
    }
    .songName {
    font-size: 18px;
    font-weight: 1000;
       .arName {
          font-size: 14px;
          font-weight: 300;
       }
      }
     .ar {
    font-size: 12px;
    font-weight: 200;
       }
  }
}
.album {
    padding: 8px 15px;
    .order {
    width: 30px;
    height: 30px;
    margin-right: 16px;
    border-radius: 8px;

    font-size: 14px;
    font-weight: 200;

    display: flex;
    justify-content: center;
    align-items: center;
    // line-height: 30px;
    // text-align: center;
     }
    .left {
        .name {
    font-size: 18px;
    font-weight: 1000;
      }
    }
    .al {
    font-size: 14px;
    font-weight: 200;
}
  .time {
    font-weight: 300;
}

}
.highLight {
  background: var(--color-primary-bg);
  color: var(--color-primary);
  &:hover {
    background: var(--color-primary-bg);
    color: var(--color-primary);
  }
}
</style>