<template>
    <div class="cover-row">
        <div class="container">
            <!-- <Cover class="artist"/> -->
            <Cover v-for="item in items" :key="item.id" :info="item" :type="type" showTitle="true" />
        </div> 
    </div>
</template>

<script>
import Cover from './Cover.vue';
export default {
  name: 'coverRow',
  components: {Cover},
  props: ['items','type'] //type: 'playlist' | 'album' | 'artist'
}
</script>
  
<style scoped>
.cover-row {

}
.container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
    justify-items: center;
}
</style>