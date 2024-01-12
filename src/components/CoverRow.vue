<template>
    <div class="cover-row">
        <div class="container" :style="coverStyle">
            <Cover v-for="item in items" :key="item.id" :info="item" :type="type" showTitle="true" />
        </div> 
    </div>
</template>

<script>
import Cover from './Cover.vue';
export default {
  name: 'coverRow',
  components: {Cover},
  data() {
    return {
      coverStyle: {},
    }
  },
  props: {
    items: {
        type: Array,
    },
    //type: 'playlist' | 'album' | 'artist'
    type: {
        type: Object
    },
    columnNumber: {
        type: Number,
        default: 5
    },
  },   
  created() {
    this.coverStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.columnNumber}, 1fr)`,
    }
  }
}
</script>
  
<style scoped>
.container {
    gap: 24px;
    justify-items: center;
}
</style>