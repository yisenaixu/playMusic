import request from "../utils/request";

export function fetchNewAlbums() {
    return request({
        url:'/album/newest',
        method: 'get'
    })
}

/**
 * @description 获取专辑内容
 */
export function fetchAlbumDetail(id) {
    return request({
        url: '/album',
        method: 'get',
        params: {
            id,
        }
    })
}