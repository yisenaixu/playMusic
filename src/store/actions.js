import { getSongListDetail } from "../api/playlist";
import { getTrackDetail } from "../api/track";
import { likedAlbums, likedArtists, userAccount, userLikeSongsIDs, userPlayHistory, userPlaylist } from "../api/user";
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
      return userLikeSongsIDs(state.userData.user.userId)
               .then(res => {
                if(res.ids) {
                  commit('updateLikedXXX',{
                    name: 'songs',
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
    }                                                               
}