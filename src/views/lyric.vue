<template>
   <div class="lyric" :style="{ background }">
     <div class="left">
        <div class="container">
          <div class="img">
            <img :src="picUrl" loading="lazy">
          </div>
          <div class="infOpt">
            <div class="info">
              <div class="name">{{ trackName }}</div>
              <div class="ar">{{ ar }}</div>
            </div>
            <div class="opt">
              <div class="volumeControl">
                    <button-icon :style="{background: 'transparent'}">
                       <svg-icon symbolId="icon-volume" className="svgIcon"></svg-icon>
                       <!-- <svg-icon symbolId="icon-volume-mute" className="svgIcon"></svg-icon>
                       <svg-icon symbolId="icon-volume-half" className="svgIcon"></svg-icon> -->
                    </button-icon>
                    <div class="volumeBar">
                        <vue-slider
                        v-model="volume"
                        :min="0"
                        :max="1"
                        :interval="0.01"
                        :drag-on-click="true"
                        :duration="0"
                        :dotSize="8">
                        </vue-slider>
                    </div>
                </div> 
                <button-icon :style="{background: 'transparent'}">
                    <svg-icon symbolId="icon-heart" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
          </div>
          <div class="progressBox">
            0:00
            <div class="progressBar">
              <vue-slider
                v-model="progress"
                :min="0"
                :max="player.currentTrackDuration"
                :interval="1"
                :height="6"
                :duration="0"
                :dotSize="8"
                :dragOnClick="true"
                :tooltip-formatter="formatTrackTime"
                :lazy="true"
                :silent="true"
              ></vue-slider>
          </div>
          {{ formatTrackTime(player.currentTrackDuration) }}
          </div>
          <div class="middleControl">
                <button-icon title="上一首" :style="{background: 'transparent'}">
                    <svg-icon symbolId="icon-previous" className="svgIcon" @click="playPrevTrack" v-show="!isFm"></svg-icon>
                    <svg-icon class="disable" symbolId="icon-previous" className="svgIcon" v-show="isFm"> </svg-icon>
                </button-icon>
                <button-icon @click='playing ? pause() : play()' :style="{background: 'transparent'}">
                    <svg-icon v-if="!playing" symbolId="icon-play" className="svgIcon big" ></svg-icon>
                    <svg-icon v-if="playing" symbolId="icon-pause" className="svgIcon big" ></svg-icon>
                </button-icon>
                <button-icon :style="{background: 'transparent'}">
                    <svg-icon symbolId="icon-next" className="svgIcon" @click="playNextTrack"></svg-icon>
                </button-icon>
            </div>
        </div> 
     </div> 
     <div class="right">
       <div class="container">
          <div 
            v-for="(lyric, index) in lyrics" 
            :key="lyric" 
            :id="`line${index}`" 
            class="lyricItem" 
            :class="{hight: hightIndex === index}"
            @click="() => handleclick(lyric.time)"  
          >
            {{ lyric.lyr }}
          </div> 
       </div> 
     </div> 
   </div> 
</template>
<script>
import { mapState } from 'vuex'
import { getLyrics } from '../api/track'
import { parseLyric } from '../utils/lyric'
import SvgIcon from '../components/SvgIcon.vue'
import ButtonIcon from '../components/ButtonIcon.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import '../assets/css/slider.css'
import { formatTime } from '../utils/common'
import ColorThief from "colorthief";
import Color from 'color'
 export default {
    name: 'lyric',
    components: { SvgIcon, ButtonIcon, VueSlider },
    data() {
        return {
            lyrics: undefined,
            lyricInterval: null,
            hightIndex: -1,
            background: ''
        }
    },
    created() {
      getLyrics(this.player.currentTrack.id).then(res => {
        console.log(res)
        this.lyrics = parseLyric(res.lrc.lyric)
        console.debug(this.lyrics)
        this.setLyrciInterval()
      })
      this.getColor()
    },
    unmounted() {
      this.lyricInterval = null
    },
    computed: {
        ...mapState(['player']),
        currentTrack() {
          return this.player.currentTrack
        },
        picUrl() {
          return this.currentTrack.al.picUrl
        },
        ar() {
          return this.currentTrack.ar[0].name
        },
        trackName() {
          return this.currentTrack.name
        },
        playing() {
            return this.player.playing
        },
        isFm() {
            return this.player.isFm
        },
        volume:{
            get() {
                return this.player.volume
            },
            set(value) {
                this.player.volume = value  
            }
        },
        progress:{
            get() {
                return this.player.progress
            },
            set(value) {
                this.player.progress = value 
            }
        },
    },
    methods: {
      formatTrackTime(val) {
            return  formatTime(val) 
       },
       handleclick(time) {
         this.player.seek(time)  
       },
      setLyrciInterval() {
        this.lyricInterval = setInterval(() => {
          const progress = this.player.progress
          let oldHighlightLyricIndex = this.hightIndex;
          this.hightIndex = this.lyrics.findIndex((lyric, index) => {
            // 跳过空白歌词
            if(lyric.lyr === '') return ;
            let nextLyric = this.lyrics[index + 1]
            while(nextLyric.lyr === '') {
              index = index + 1
              nextLyric = this.lyrics[index + 1]
            }
            return progress > lyric.time && nextLyric ? progress < nextLyric.time : true
          })
          console.log(this.hightIndex, progress)
          console.log(this.hightIndex, oldHighlightLyricIndex)
          if(this.hightIndex !== oldHighlightLyricIndex) {
            const el = document.getElementById(`line${this.hightIndex}`)
          if(el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
          }
        }, 50);
      },
      getColor() {
      const colorThief = new ColorThief();
      if (!this.picUrl) return;
      const cover = `${this.picUrl.replace(
        "http://",
        "https://"
      )}?param=512y512`;
      const img = new Image();
      img.addEventListener('load', () =>{
        const mainColor = colorThief.getColor(img)
        const color1 = Color.rgb(mainColor)
                         .lighten(0.28)
                         .rotate(-30)
                         .rgb()
                         .string()
        const color2 = Color.rgb(mainColor)
                         .darken(0.1)
                         .rgb()
                         .string()
        this.background = `linear-gradient(to top left, ${color1}, ${color2})`;
      })
      img.crossOrigin = 'Anonymous'
      img.src = cover
      console.debug(cover)
    },
    },
 }
</script>

<style lang="scss" scoped>
  .lyric {
    height: calc(100vh - 134px);
    padding: 0 10vw;
    display: flex;
    .left {
      flex: 1;
      height: 100%;
      .container {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        .img {
          width: 50%;
          img {
            border-radius: 16px;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .infOpt{
          width: 50%;
          display: flex;
          justify-content: space-between;
          margin-top: 36px;
          .info {
            .name {
              font-size: 28px;
              font-weight: 600;      
              color: white;
            }
            .ar {
              font-size: 18px;
              font-weight: 200;
              color: rgba(255,255,255,0.7);
            }
          }
          .opt {
            display: flex;
            align-items: center;
            .volumeControl {
                display: flex;
                align-items: center;
                .volumeBar {
                    width: 80px;
                }
             }
          }
        }
        .progressBox {
            width: 50%;
            margin-top: 12px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 14px;
            font-weight: 300;
            .progressBar {
              width: 80%;
            }
        }
        .middleControl {
             width: 50%;
             margin-top: 12px;
             display: flex;
             justify-content: center;
             align-items: center;
             .disable {
                cursor: no-drop;
              }
             .big {
                width: 25px;
                height: 25px;
             }
           }
      }
    }
    .right {
      flex: 1;
      display: flex;
      height: 100%;
      .container {
        height: 90%;
        overflow-y: scroll;
        .lyricItem {
          padding: 12px 8px;
          border-radius: 8px;
          font-size: 26px;
          font-weight: 600;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          &:hover {
            background: var(--color-secondary-bg-for-transparent);
          }
        }
        .hight {
          color: white;
        }
      }
      .container::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
      }
    }
  }
</style>