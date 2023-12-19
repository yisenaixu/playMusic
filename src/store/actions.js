import { likeAlbum, likeArtist, likeMV, likePlaylist, likeSong } from "../api/like";
import { getSongListDetail } from "../api/playlist";
import { dailyTracks, getTrackDetail } from "../api/track";
import { likedAlbums, likedArtists, likedMVs, userAccount, userLikeSongsIDs, userPlayHistory, userPlaylist } from "../api/user";
import { isLoggedIn } from "../utils/auth"

export default {
    /**
     * 获取用户数据 
     */
    fetchUserProfile( {commit}) {
          if(!isLoggedIn()) return;
          return userAccount().then( res => {
            if(res.code === 200) {
                commit('updateUserData', { key: 'user', value: res.profile})
            }
          })
    },
    /**
     * 获取播放历史
     */
    fetchPlayHistory({state, commit}) {
      if(!isLoggedIn()) return;
      return Promise
              .all([
                    userPlayHistory({uid:state.userData.user?.userId, type: 0}), //allData
                    userPlayHistory({uid:state.userData.user?.userId, type: 1})  //weekData
                  ])
              .then(res => {
                const data = {};
                const dataType = {0:'allData', 1: 'weekData'};
                //res [{song,playCount,score}]
                console.log(res);
                for(let i = 0 ; i< res.length; i++) {
                  const songData = res[i][dataType[i]].map(item => {
                    const song = item.song;
                    song.playCount = item.playCount;
                    return song;
                  })
                  data[dataType[i]] = songData;
                }
                commit('updateLikedXXX',{
                  name: 'playHistory',
                  data,
                })
              })
    },
      /**
     * 获取喜欢的歌曲id
     */
    fetchLikedSongs({state, commit}) {
      if(!isLoggedIn()) return ;
      console.debug("更新喜欢歌曲ID")
      return userLikeSongsIDs(state.userData.user.userId)
               .then(res => {
                if(res.ids) {
                  commit('updateLikedXXX',{
                    name: 'songsId',
                    data: res.ids
                  })
                }
               })
    },
    /**
     * 获取喜欢的歌曲及其具体信息
     */ 
    fetchLikedSongsDetail({state, commit}) {
      if(!isLoggedIn()) return ;
      console.debug(state.userData)
      return getSongListDetail(state.userData.likedPlaylistId)
               .then(res => {
                if(res.playlist.trackIds.length > 0) {
                  console.log(res.playlist.trackIds);
                  return getTrackDetail
                           (res.playlist.trackIds
                              .slice(0,16)
                              .map(t => t.id)     
                              .join(',')     
                           )
                           .then(res => {
                            console.log(res);
                            commit('updateLikedXXX', {
                              name: 'songsDetails',
                              data: res.songs
                            })
                           })                                      
                }
               })
    },
    /**
     * 获取喜欢的歌单并在userData添加 我的喜欢 歌单的id
     */
    fetchLikedPlaylist({state, commit}) {
      if(!isLoggedIn()) return ;
      return userPlaylist({
        uid: state.userData.user?.userId,
        limit: 2000 // max
      })
      .then(res => {
        if(res.playlist) {
          console.debug(res.playlist)
          commit('updateLikedXXX',{
            name: 'playlists',
            data: res.playlist
          }),
          commit('updateUserData',{
            key: 'likedPlaylistId',
            value: res.playlist[0].id
          })
        }
      })
    },
    /**
     * 获取喜欢的专辑
     */
    fetchLikedAlbums({state, commit}) {
      if(!isLoggedIn()) return ;
      console.debug("更新喜欢专辑")
      return likedAlbums({limit: 2000})
               .then(res => {
                if(res.data) {
                  commit('updateLikedXXX',{
                    name: 'albums',
                    data: res.data
                  })
                }
               })
    },
    /**
     * 获取喜欢的歌手
     */
    fetchLikedArtists({state, commit}) {
      if(!isLoggedIn()) return ;
      return likedArtists({limit: 2000})
               .then(res => {
                if(res.data) {
                  commit('updateLikedXXX',{
                    name: 'artists',
                    data: res.data
                  })
                }
               })
    },
    /**
     * 获取喜欢的mv
     */
    fetchLikedMVs({state, commit}) {
      if(!isLoggedIn()) return ;
      return likedMVs()
               .then(res => {
                console.debug(res)
                if(res.data) {
                  commit('updateLikedXXX',{
                    name: 'mvs',
                    data: res.data
                  })
                }
               })
    },
    /**
     * 获取日推歌曲
     */           
    fetchDailyTracks({ commit }) {
      if(!isLoggedIn()) return ;
      return dailyTracks()
               .then(res => {
                console.log(res);
                if(res.data) {
                  commit('updateDailyTracks',res.data.dailySongs)
                }
               })
    }, 
    
    /**
     * 喜欢一首歌曲
     * @param {object} payload
     * @param {number} payload.id
     * @param {number} payload.t
     */
    LikeATrack({ dispatch }, payload) {
      if(!isLoggedIn()) return ;
      likeSong(payload)
       .then(res => {
          console.log(res)
          dispatch('fetchLikedSongs')  
          dispatch('fetchLikedSongsDetail')  
        })
    },

     /**
     * 喜欢一个专辑
     * @param {object} payload
     * @param {number} payload.id
     * @param {number} payload.t
     */
     LikeAAlbum({ dispatch }, payload) {
       if(!isLoggedIn()) return ;
       console.debug(payload)
       likeAlbum(payload)
        .then(res => {
           console.log(res)
           dispatch('fetchLikedAlbums') 
         })
     },

    /**
     * 喜欢一个歌单
     * @param {object} payload
     * @param {number} payload.id
     * @param {number} payload.t
     */
     LikeAPlaylist({ dispatch }, payload) {
       if(!isLoggedIn()) return ;
       likePlaylist(payload)
        .then(res => {
           console.log(res)
           dispatch('fetchLikedPlaylist')  
         })
     },
     
    /**
     * 喜欢一个歌手
     * @param {object} payload
     * @param {number} payload.id
     * @param {number} payload.t
     */
    LikeAArtist({ dispatch }, payload) {
      if(!isLoggedIn()) return ;
      likeArtist(payload)
       .then(res => {
          console.log(res)
          dispatch('fetchLikedArtists')  
        })
    },

    /**
     * 喜欢一个MV
     * @param {object} payload
     * @param {number} payload.id
     * @param {number} payload.t
     */
        LikeAMV({ dispatch }, payload) {
          if(!isLoggedIn()) return ;
          likeMV(payload)
           .then(res => {
              console.log(res)
              dispatch('fetchLikedMVs')  
            })
        },

}