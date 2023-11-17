import { timestamp } from "../utils/timestamp"
import request from "../utils/request"
/**
 * @description 获取用户账号信息
 * @returns {}
 */
export function userAccount() {
    return request({
        url: '/user/account',
        methods: 'get',
        params: {
            timestamp 
        }
    })
}