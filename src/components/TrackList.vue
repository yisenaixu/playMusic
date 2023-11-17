<template>
    <div class="trackList">
        <div class="container" :style="listStyle">
            <TrackListItem
              v-for="(item, index) in songs"
              :key="item.id"
              :track="item"
              :type="type"
              :trackNo="index + 1"
              :isShowTime="isShowTime"
            />
        </div>
    </div>
</template>

<script>
import TrackListItem from './TrackListItem.vue'
  export default {
    name: 'TrackList',
    props: {
      songs: {
        type: String
      }, 
      type: {
        type: String,
        default: 'playlist', //tracklist | playlist | album
      },
      columnNumber: {
        type: Number,
        default: 4
      },
      isShowTime: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        listStyle: {},
      }
    },
    created() {
      if(this.type === 'tracklist') [
        this.listStyle = {
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: `repeat(${this.columnNumber}, 1fr)`,
        }
      ]
    },
    components: { TrackListItem }
}
</script>

<style scoped>

</style>