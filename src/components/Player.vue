<template>
    <div class="player">
        <div class="progressBar">
            <vue-slider
              v-model="progress"
              :min="0"
              :max="player.currentTrackDuration"
              :interval="1"
              :height="2"
              :duration="0"
              :dotSize="8"
              :dragOnClick="true"
              :tooltip-formatter="formatTrackTime"
              :lazy="true"
              :silent="true"
            ></vue-slider>
        </div>
        {{ console.log(player.currentTrackDuration) }}
        <div class="control">
            <div class="leftControl">                                                   
                <TrackList type="tracklist" :isShowTime="false" :highLightPlayingTrack="false" :songs="[currentTrack]" />
                <button-icon>
                    <svg-icon symbolId="icon-heart" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
            <div class="middleControl">
                <button-icon title="上一首">
                    <svg-icon symbolId="icon-previous" className="svgIcon" @click="playPrevTrack" v-show="!isFm"></svg-icon>
                    <svg-icon class="disable" symbolId="icon-previous" className="svgIcon" v-show="isFm"> </svg-icon>
                </button-icon>
                <button-icon @click='playing ? pause() : play()'>
                    <svg-icon v-if="!playing" symbolId="icon-play" className="svgIcon big" ></svg-icon>
                    <svg-icon v-if="playing" symbolId="icon-pause" className="svgIcon big" ></svg-icon>
                </button-icon>
                <button-icon>
                    <svg-icon symbolId="icon-next" className="svgIcon" @click="playNextTrack"></svg-icon>
                </button-icon>
            </div>
            <div class="rightControl">
                <button-icon v-show="!isFm"
                             @click="player.mode === 'repeat' 
                                    ? player.switchModeOne()
                                    : player.mode === 'one'
                                      ? player.switchModeShuffle()
                                      : player.switchModeRepeat() ">
                    <svg-icon v-show="player.mode === 'shuffle'" symbolId="icon-shuffle" className="svgIcon"></svg-icon>
                    <svg-icon v-show="player.mode === 'repeat'" symbolId="icon-repeat" className="svgIcon"></svg-icon>
                    <svg-icon v-show="player.mode === 'one'" symbolId="icon-repeat-1" className="svgIcon"></svg-icon>
                </button-icon>
                <div class="volumeControl">
                    <button-icon>
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
                <button-icon  @click="navigateList">
                    <svg-icon symbolId="icon-list" className="svgIcon"></svg-icon>
                </button-icon>
                <button-icon @click="() => $router.push({name: 'lyric'})">
                    <svg-icon symbolId="icon-arrow-up" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
        </div>
    </div>
</template>
<script>
import ButtonIcon from './ButtonIcon.vue';
import SvgIcon from './SvgIcon.vue';
import TrackList from './TrackList.vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import '../assets/css/slider.css'
import { mapState } from 'vuex';
import { formatTime } from '../utils/common';
export default {

    name: 'Player',
    components: {TrackList, ButtonIcon, SvgIcon, VueSlider},
    data() {
        return { 
        }
    },
    computed: {
        ...mapState(['player']),
        currentTrack() {
            return this.player.currentTrack
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
       playPrevTrack() {
        return this.player.playPrevTrack()
       },
       playNextTrack() {
        return this.player.playNextTrack(false)
       },
       play() {
        return this.player.play()
       },
       pause() {
        return this.player.pause()
       },
       navigateList() {
        if(this.$route.name !== 'list') {
            this.$router.push({path: '/list'})
        } else {
            this.$router.go(-1);
        }
       },
       formatTrackTime(val) {
            return  formatTime(val) 
       }

    }
}
</script>
<style lang="scss" scoped>
    .player {
        min-width: 1320px;
        position: sticky;
        z-index: 9999;
        bottom: 0;
        background: var(--color-body-bg);
        left: 0;
        right: 0;
        padding: 0 10vw;
        .progressBar {
            width: 100%;
        }
        .control {
           width: 100%;
           display: flex;
           justify-content: space-between;
           align-items: center;
           .leftControl {
            display: flex;
            align-items: center;
             flex: 1;
           }
           .middleControl {
             flex: 1;
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
           .rightControl {
             flex: 1;
             display: flex;
             justify-content: right;
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
    }
</style>