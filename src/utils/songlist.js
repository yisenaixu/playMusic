import { isLoggedIn } from "./auth";
import { getRecommendSongList, getDailyRecommendSongList, fetchRankList } from "../api/playlist";
import { getAllTrack } from "../api/track";

export async function getPersonalRecommendSongList(limit) {
  if(isLoggedIn()) {
    const res = await getDailyRecommendSongList()     
    console.log(res);
    return res.recommend.slice(0,limit);
  } else {
    const res = await getRecommendSongList(limit)
    return res.result
  }
}

/**
 * @description 一次获取五十首歌单的歌曲
 */
export async function getPartTrack(id,offset) {
   const res = await getAllTrack({
                                   id,
                                   limit:50,
                                   offset,
                               })
    return res
}

/**
 * @description 获取限制个数的榜单数据
 * @param {Number} limit 
 * @returns 
 */
export async function fetchLimitRankList(limit) {
   const res = await fetchRankList()
   return res.list.slice(0,limit)
}

