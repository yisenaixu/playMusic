import Cookies from 'js-cookie'
import store from '../store/index'
import { logout } from '../api/auth'

export function setCookies(string) {
    const cookies = string.split(';;')
    console.log('cookies',cookies)
    cookies.map( cookie => {
        document.cookie = cookie;
        console.log('cookie',cookie)
        const cookieKeyValue = cookie.split(';')[0].split('=')
        console.log('cookieKeyValue',cookieKeyValue)
        localStorage.setItem(`cookie-${cookieKeyValue[0]}`,cookieKeyValue[1]);
    })
}

export function getCookie(key) {
    return Cookies.get(key) || localStorage.getItem(`cookie-${key}`) || undefined
}
 
export function removeCookie(key) {
    return Cookies.remove(key) || localStorage.removeItem(`cookie-${key}`)
}

export function isLoggedIn() {
    console.log(getCookie('MUSIC_U'));
    return getCookie('MUSIC_U') !== undefined
}

export function doLogout() {
    logout();
    removeCookie('MUSIC_U');
    removeCookie('__csrf');
    store.commit('updateUserData',{ key:'user', value:{}})
    console.log('退出登录');
    console.log(getCookie('MUSIC_U'));
    console.log(isLoggedIn());
}

