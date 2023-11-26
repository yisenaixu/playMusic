<template>
  <div class="card">
    <div class="container" :style="{ background }">
      <div class="img-box">
        <div class="img">
          <img :src="track.album.picUrl" alt="" />
        </div>
      </div>
      <div class="info">
        {{ console.debug(track) }}
        <div class="info-song">{{ track.name }}</div>
        <div class="info-singer">{{ track.artists[0].name }}</div>
        <div class="button">
          <button>
            <svg-icon symbolId="icon-heart" className="svgIcon"></svg-icon>
          </button>
          <button @click="player.playFm">
            <svg-icon :symbolId="player.playing && isFm ? 'icon-pause' : 'icon-play'" className="svgIcon"></svg-icon>
          </button>
          <button @click="player.playNextTrack">
            <svg-icon symbolId="icon-next" className="svgIcon"></svg-icon>
          </button>
        </div>
        <div class="card-name">
          <svg-icon symbolId="icon-fm" className="svgIcon" />私人FM
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SvgIcon from "./SvgIcon.vue";
import ColorThief from "colorthief";
import Color from 'color'
export default {
  name: "FMCard",
  components: { SvgIcon },
  data() {
    return {
      background: "",
    };
  },
  created() {
    this.getColor();
  },
  computed: {
    ...mapState(["player"]),
    track() {
      console.debug(this.player);
      return this.player.FmTrack;
    },
    isFm() {
      return this.player.isFm
    }
  },
  watch: {
    track() {
      this.getColor(); 
    }
  },
  methods: {
    getColor() {
      const colorThief = new ColorThief();
      if (!this.track.album?.picUrl) return;
      const cover = `${this.track.album.picUrl.replace(
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
};
</script>

<style scoped>
.card {
  width: 100%;
  /* border: 1px solid black; */
  cursor: pointer;
  z-index: 1;
}
.container {
  border-radius: 16px;
  display: flex;
  position: relative;
  overflow: hidden;
  background: pink;
  transition: background 0.3s;
}
.container > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
.img-box {
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  padding: 16px;
  box-sizing: border-box;
  width: 150px;
  height: 150px;
}
.img img {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.info {
  flex-grow: 2;
  position: relative;
}
.info .info-song {
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin-top: 16px;
}
.info .info-singer {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.33);
  margin-top: 8px;
}
.button {
  position: absolute;
  left: 16px;
  bottom: 16px;
}
.button button {
  cursor: pointer;
  margin: 0 8px;
  border: none;
  background: transparent;
}
.card-name {
  position: absolute;
  right: 8px;
  bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  user-select: none;
  display: flex;
  align-items: center;
}
</style>