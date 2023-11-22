<template>
    <div class="home">
        <div class="index-row">
          <div class="title">For you</div>
          <personalRow />
        </div>
        <div class="index-row">
          <div class="title">推荐歌单
            <div class="seeAll">
              <span @click="recommendIndex = recommendIndex === 10 ? 20 : 10">换一批</span>
            </div>
          </div>
          <CoverRow :items="RecommendSongList" type="playlist"/>
        </div>
        <div class="index-row">
          <div class="title">排行榜
            <div class="seeAll">
              <router-link to="/explore?cat=排行榜">查看全部</router-link>
            </div>
          </div>
          <CoverRow :items="rankList" type="playlist"/>
        </div>
        <div class="index-row">
          <div class="title">歌手推荐</div>
          <CoverRow :items="artists" type="artist" />
        </div>
        <div class="index-row">
          <div class="title">
            <div>新专速递</div>
            <div class="seeAll">
              <router-link to="/newAlbums">查看全部</router-link>
            </div>
          </div>
          <CoverRow :items="albums" type="album"/>
        </div>
    </div>   
</template>

<script>
import { fetchLimitRankList, getPersonalRecommendSongList } from '../utils/songlist';
import CoverRow from '../components/CoverRow.vue';
import PersonalRow from '../components/PersonalRow.vue';
import {fetchTopArtists} from '../api/artist'
import {fetchLimitNewAlbums} from '../utils/album'
export default {
    data() {
      return {
         recommendIndex: 10,
         RecommendSongList: [],
         rankList: [],
         artists: [],
         albums: []
      }
    },
    components: {CoverRow, PersonalRow},
    activated() {
      console.log('loadData');
      this.loadData();
    },
    watch:{
      recommendIndex: function(){
        getPersonalRecommendSongList(this.recommendIndex - 10,this.recommendIndex).then( items => {
          console.log(items);
          this.RecommendSongList = items
        })
      }
    },
    methods: {
      loadData() {
        getPersonalRecommendSongList(this.recommendIndex - 10,this.recommendIndex).then( items => {
          console.log(items);
          this.RecommendSongList = items
        })
        fetchLimitRankList(5).then(res => this.rankList = res)
        fetchTopArtists(5, 0).then(res => this.artists = res.artists)
        fetchLimitNewAlbums(5).then(res => this.albums = res)
      }
    }
}
</script>

<style lang="scss" scoped>
  .home {
    padding: 0 10vw;
    min-width: 1320px;
    display: flex;
    flex-direction: column;
  }
  .index-row {
    margin-top: 72px;
  }
  .index-row .title {
    font-size: 32px;
    font-weight: 1000;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    .seeAll {
      font-size: 14px;
      font-weight: 300;
      cursor: pointer;
    }
  }
</style> 
