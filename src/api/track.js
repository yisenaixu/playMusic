import request from "../utils/request";
/**
 * @description 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，
 *              传入对应的歌单id，即可获得对应的所有歌曲
 * @param {Object} params
 */
export function getAllTrack(params) {
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params,
    })
}

/**
 * @description 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
 * @param {string} ids
 */
export function getTrackDetail(ids) {
    return request({
        url: '/song/detail',
        method: 'get',
        params: {
            ids
        }
    })
}

/**
 * @description 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
 */
export function dailyTracks() {
    return request({
        url: '/recommend/songs',
        method: 'get',
    })
}
