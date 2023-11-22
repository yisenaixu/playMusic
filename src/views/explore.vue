<template>
  <div class="explore">
    <div class="buttons">
        <div :class="{all: true, button: true, active:activeCat === '全部'}"
             @click="activeCat = '全部'"
             >
              全部
            </div>   
        <div :class="{all: true, button: true, active:activeCat === '排行榜'}"
             @click="activeCat = '排行榜'"
             >
              排行榜
        </div>  
        <div v-for="cat in settings.enabledPlaylistCategories" 
             :key="cat" 
             :class="{button: true, active:activeCat === cat}"
             @click="activeCat = cat">
            {{ cat }}
        </div>
        <div class="more button" @click="showPanel = !showPanel">...</div>
    </div>
    <div class="panel" v-show="showPanel">
        <div class="container">
            <div v-for="bigCat in bigCats" :key="bigCat.name" class="row">
               <div class="bigCat">{{ bigCat.name }}</div>
               <div class="cats">
                  <div v-for="cat in getCatsByBigCats(bigCat.category)" 
                   :key="cat.name" 
                   :class="{cat: true,show: settings.enabledPlaylistCategories.includes(cat.name)}"
                   @click="togglePlaylistCategory(cat.name)">
                    {{ cat.name }}
                 </div>
               </div>
            </div>
        </div>
    </div>
    <div class="playlist">
        <div class="container">
            <CoverRow :items="playlists" type="playlist"/>
        </div>
    </div>
    <div v-if="haveMore" class="moreButton">
          <MyButton   
          @click="loadmore"
          >
           加载更多
          </MyButton>
       </div>
  </div>
</template>

<script>
import { getHotPlayListCats, fetchAllCatlist } from '../api/cat';
import {  fetchPlaylistByCat, fetchRankList } from '../api/playlist'
import CoverRow from '../components/CoverRow.vue';
import bigCats from '../utils/bigCats'
import { mapState, mapMutations } from 'vuex';
import MyButton from '../components/Mybutton.vue';
export default {
    name: 'explore',
    data() {
        return {
            // hotCat: [],
            showPanel: false,
            bigCat: [],
            catlist: [],
            // showCat: [],
            playlists: [],
            total: 25,
            currentTotal: 0,
            activeCat: '全部',
            limit: 25,
        }
    },
    components: {CoverRow, MyButton},
    mounted() {
        this.getHotCats();
        this.fetchAllCats();
        this.bigCats = bigCats
        if(this.$route.query?.cat) {
            this.activeCat = this.$route.query?.cat
        }
        console.log(this.settings);
    },
    activated() {
        this.fetchPlaylistByCat()
    },
    computed: {
        ...mapState(['settings']),
        haveMore() {
            return this.total > this.currentTotal
        }
    },
    methods: {
        ...mapMutations(['togglePlaylistCategory','updateSettings']),
        async getHotCats() {
            await getHotPlayListCats().
            then(res => {this.showCat = res.tags.map(tag => tag.name)});
            if(this.settings.enabledPlaylistCategories === 'null') {
                console.log('设置默认settings')
                this.updateSettings({key: 'enabledPlaylistCategories', value: this.showCat })
            }
        },
        fetchAllCats() {
            fetchAllCatlist().
            then(res => {this.catlist= res.sub.map(tag => ({name:tag.name,category:tag.category}))})
        },
        getCatsByBigCats(category) {
            return this.catlist.filter(item => item.category === category)
        },
        fetchPlaylistByCat(isReplace = true) {
            if(this.activeCat === '排行榜') {
                fetchRankList()
                  .then(res => {
                    this.playlists = res.list;
                    this.currentTotal = res.list.length
                  })
            } else {
                fetchPlaylistByCat(this.activeCat,this.limit,this.playlists.length)
                  .then(res => {
                              if(isReplace) {
                               this.playlists = res.playlists;
                             } else {
                               this.playlists = [...this.playlists, ...res.playlists];
                             }
                              this.total = res.total;
                              this.currentTotal += this.limit;
                              })
                }
        },
        loadmore() {
           this.fetchPlaylistByCat(false);
        }
    },
    watch:{
        activeCat(newValue) {
            console.log('切换歌单',this.activeCat);
            this.fetchPlaylistByCat()
        }
    }
}
</script>

<style lang="scss" scoped>
  .explore {
    padding: 0 10vw;
    .buttons {
        display: flex;
        flex-wrap: wrap;
        .button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 8px 12px;
        padding: 8px 24px;
        border-radius: 10px;
        user-select: none;
        background-color: var(--color-secondary-bg);
        color: var(--color-secondary);
        transition: 0.2s;
        font-size: 20px;
        font-weight: 700;
        
        &:hover {
            background-color: var(--color-primary-bg);
            color: var(--color-primary);
        }
    }
    .active {
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
    }
    }
    .panel {
        margin-top: 12px;
        background-color: var(--color-secondary-bg);
        overflow: hidden;
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 12px;
            margin-top: 24px;
            .row {
                display: flex;
                margin-bottom: 32px;
                .bigCat {
                    font-size: 30px;
                    font-weight: 800;
                    min-width: 60px;
                    color: var(--color-secondary);
                } 
                .cats {
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: 24px;
                }
                .cat {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 80px;
                    margin: 8px 24px;
                }
                .show {
                    color: var(--color-primary);
                }
            }
        }
    }
    .playlist {
        margin-top: 12px;
    }
    .moreButton{
        display: flex;
        justify-content: center;
        margin-top: 16px
    };
    // .button {
    // display: flex;
    // justify-content: center;
    
    //   button {
    //     width: 120px;
    //     height: 40px;
    //     font-size: 20px;
    //     font-weight: 1000;
    //     border-radius: 8px;
    //     border: none;
    //     background: var(--color-primary-bg-for-transparent);
    //     cursor: pointer;
    //   }
    // }
  }
</style>