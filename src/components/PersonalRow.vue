<template>
   <div class="personal-row">
     <DailyRecSongCard />
     <FMCard />
   </div>
</template>

<script>
import DailyRecSongCard from './DailyRecSongCard.vue'
import FMCard from './FMCard.vue'
export default {
  components: { DailyRecSongCard, FMCard },
    name: 'PersonalRow'
}
</script>

<style scoped>
   .personal-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 50px;
      gap: 300px;
      place-items: center;
   }
</style>