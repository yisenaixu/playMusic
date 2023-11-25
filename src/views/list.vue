<template>
  <div class="list">
    <div class="title">播放列表</div>
    <TrackList 
      type="playlist"
      :is-show-time="false"
      :songs="songs"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getTrackDetail } from '../api/track';
import TrackList from '../components/TrackList.vue';
export default {
  name: 'list',
  components: {TrackList},
  data() {
    return {
        songs: [],
    }
  },
  computed: {
    ...mapState(['player'])
  },
  mounted() {
    console.log(this.player.list)
    getTrackDetail(this.player.list
                     .join(','))
      .then(res => {
        console.log(res);
        this.songs = res.songs
      })
  }
}
</script>

<style lang="scss" scoped>
  .list {
    padding: 0 10vw;
    min-height: calc(100vh - 134px);
    .title {
        font-size: 40px;
        font-weight: 600;
        margin-bottom: 8px;
    }
  }
</style>