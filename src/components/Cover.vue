<template>
    <div 
      class="cover"
      @mouseover="focus = true"
      @mouseleave="focus = false"
      @click="goDetail">
        <div class="container">
            <div class="img"> 
                <img :class="{circle: type === 'artist'}" :src="imgsrc" alt="" loading="lazy">
                <div 
                  class="shade"
                  v-show="focus"
                  >
                  <button @click.stop="play" class="play-button">
                    <svgIcon
                      @click="play" 
                      symbolId="icon-play" 
                      className="svgIcon"/>
                  </button>
                </div>
            </div>
            <div v-if="showTitle" :class="{title: true, center:type === 'artist'}">
              <div v-if="$route.name === 'explore' && type === 'playlist'" class="playCount">
                <SvgIcon symbolId="icon-play" className="svgIcon" class="small"></SvgIcon> 
                {{ playCount }}
              </div>
              {{info?.name}}
            </div>
            <div v-if="type !== 'artist'" :class="{subTitle: true, center:type === 'artist'}">
              {{
                type === 'album' ? info.artist?.name : info?.updateFrequency}}
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState } from 'vuex'
import { transformDate, transformNumber } from '../utils/common'
import SvgIcon from './SvgIcon.vue'
export default {
  components: { SvgIcon },
  data() {
    return {
        focus: false
    }
  },
  name: 'cover',
  props: ['info', 'type', 'showTitle', 'coverImgUrl'],
  computed: {
    ...mapState(['player']),
    imgsrc() {
      let src = this.info?.picUrl ?? this.coverImgUrl ?? this.info?.coverImgUrl
      src = src + '?param=512y512'
      console.log(this.info)
      console.log(src);
      return src
    },
    playCount() {
      return transformNumber(this.info.playCount)
    }
  },
  methods: {
    goDetail() {
      this.$router.push( {name: this.type, params:{id:this.info.id}})
    },
    play() {
      console.log(this.type)
      const playActions = {
        album: this.player.playAlbumById,
        playlist: this.player.playPlaylistById,
        artist: this.player.playArtistById,
      }
      // 方法变为以playActions使用 所以this值改变 bind重新绑定
      playActions[this.type].bind(this.player)(this.info.id);
    }
  }
}
</script>

<style lang='scss' scoped>
    .cover {
        width: 100%;
        cursor: pointer;
    }
    .container {
        width: 100%;
    }
    .img {
        width:100%;
        border-radius: 8px;
        height: 0;
        padding-bottom: 100%;
        position: relative;
    }
    img {
       width: 100%;
       border-radius: 16px;
       object-fit: cover;
    }
    .circle {
      border-radius: 50%;
    }
    .small {
      width: 8px;
      height: 8px;
      color: var(--color-secondary);
    }
    .title {
        width: 100%;
        margin-top: 8px;
        padding: 0 4px;
        font-size: 20px;
        font-weight: 600;
        text-align: start;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        .playCount {
          font-size: 12px;
          font-weight: 200;
          color: var(--color-secondary);
          }
        }
    .subTitle {
        padding: 0 4px;
        font-size: 12px;
        font-weight: 100;
        text-align: start;
    }
    .center {
      text-align: center;
    }
    .shade {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .play-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 20%;
        color: white;
        backdrop-filter: blur(8px);
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
    }
</style>