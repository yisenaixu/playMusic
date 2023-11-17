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

