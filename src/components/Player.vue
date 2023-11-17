<template>
    <div class="player">
        <div class="progressBar">
            <vue-slider
              v-model="temValue"
              :min="0"
              :max="1000000"
              :interval="1"
              :height="2"
              :dotSize="8"
              :dragOnClick="true"
            ></vue-slider>
        </div>
        <div class="control">
            <div class="leftControl">
                <!-- <TrackListItem type="playlist" :isSimplify="true"/> -->
                <button-icon>
                    <svg-icon symbolId="icon-heart" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
            <div class="middleControl">
                <button-icon title="上一首">
                    <svg-icon symbolId="icon-previous" className="svgIcon"></svg-icon>
                </button-icon>
                <button-icon>
                    <svg-icon symbolId="icon-play" className="svgIcon big"></svg-icon>
                </button-icon>
                <button-icon>
                    <svg-icon symbolId="icon-next" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
            <div class="rightControl">
                <div class="volumeControl">
                    <button-icon>
                       <svg-icon symbolId="icon-volume" className="svgIcon"></svg-icon>
                       <!-- <svg-icon symbolId="icon-volume-mute" className="svgIcon"></svg-icon>
                       <svg-icon symbolId="icon-volume-half" className="svgIcon"></svg-icon> -->
                    </button-icon>
                    <div class="volumeBar">
                        <vue-slider
                        v-model="temValue"
                        :min="0"
                        :max="1"
                        :interval="0.01"
                        :drag-on-click="true"
                        :duration="0"
                        :dotSize="8">
                        </vue-slider>
                    </div>
                </div> 
                <button-icon>
                    <svg-icon symbolId="icon-list" className="svgIcon"></svg-icon>
                </button-icon>
                <button-icon>
                    <svg-icon symbolId="icon-arrow-up" className="svgIcon"></svg-icon>
                </button-icon>
            </div>
        </div>
    </div>
</template>
<script>
import ButtonIcon from './ButtonIcon.vue';
import SvgIcon from './SvgIcon.vue';
import TrackListItem from './TrackListItem.vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import '../assets/css/slider.css'
export default {

    name: 'Player',
    components: {TrackListItem, ButtonIcon, SvgIcon, VueSlider},
    data() {
        return {
            temValue: 100,
        }
    }
}
</script>
<style lang="scss" scoped>
    .player {
        min-width: 1320px;
        position: sticky;
        z-index: 9999;
        // box-sizing: border-box;
        bottom: 0;
        background: var(--color-body-bg);
        left: 0;
        right: 0;
        // width: 100%;
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