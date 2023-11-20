<template>
  <div class="mv-row" :style="listStyle">
    <div
      v-for="item in items"
      :key="item"
      class="cover"
      @mouseover="focus = true"
      @mouseleave="focus = false"
      @click="() => $router.push({path: `/mv/${item.id}`})"
    >
      <div class="container">
        <div class="img">
          <img
            :src="item.imgurl ?? item.cover"
            alt=""
            loading="lazy"
          />
        </div>
        <div
          :class="{ title: true}"
        >
          {{ item.name }}
        </div>
        <div class="time" v-show="showTime">
            {{ item.publishTime }}
        </div>
        <div class="name" v-show="!showTime">
            {{ item.artistName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mvRow",
  data() {
    return {
        listStyle: {},
    }
  },
  created() {
    this.listStyle = {
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: `repeat(${this.columnNumber}, 1fr)`,
        }
  },
  props: {
    items: {
        type: Array
    },
    columnNumber: {
        type: Number,
        default: 1
      },
    showTime: {
        type: Boolean,
        default: true
    }
  }, 

};
</script>
  
<style lang="scss" scoped>
.mv-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  justify-items: center;
  .cover {
    cursor: pointer;
    .img {
        width: 100%;
        img {
            width: 100%;
            border-radius: 24px;
        }
    }
    .title {
        font-size: 14px;
        font-weight: 600;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .time,.name {
        font-size: 12px;
        font-weight: 200;
    }

  }
}
</style>