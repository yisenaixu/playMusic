<template>
  <div class="mv-row">
    <div
      v-for="item in items"
      :key="item"
      class="cover"
      @mouseover="focus = true"
      @mouseleave="focus = false"
      @click="goDetail"
    >
      <div class="container">
        <div class="img">
          <img
            :src="item.imgurl"
            alt=""
            loading="lazy"
          />
        </div>
        <div
          :class="{ title: true}"
        >
          {{ item.name }}
        </div>
        <div class="time">
            {{ item.publishTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mvRow",
  props: ["items", "type"], //type: 'playlist' | 'album' | 'artist'
};
</script>
  
<style lang="scss" scoped>
.mv-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  justify-items: center;
  .cover {
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
    .time {
        font-size: 12px;
        font-weight: 200;
    }

  }
}
</style>