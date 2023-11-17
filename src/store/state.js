import initLocalStorage from './initLocalStorage';
import pkg from '../../package.json';
if (localStorage.getItem('appVersion') === null) {
    localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings));
    console.log(initLocalStorage.settings);
    // localStorage.setItem('data', JSON.stringify(initLocalStorage.data));
    localStorage.setItem('appVersion', pkg.version);
  }

export default {
    userData: {},
    settings: JSON.parse(localStorage.getItem('settings'))
}