import initLocalStorage from './initLocalStorage';
import pkg from '../../package.json';
if (localStorage.getItem('appVersion') === null) {
    localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings));
    console.log(initLocalStorage.settings);
    // localStorage.setItem('data', JSON.stringify(initLocalStorage.data));
    localStorage.setItem('appVersion', pkg.version);
  }

export default {
    liked: {
      songsId: [],
      songsDetails: [],
      playlists: [],
      albums: [],
      mvs: [],
      artists: [],
      cloud: [],
      playHistory: {
        weekData: [],
        allData: []
      }
    },
    dailyTracks: [],
    player: JSON.parse(localStorage.getItem('player')),
    userData: JSON.parse(localStorage.getItem('userData')) ?? {},
    settings: JSON.parse(localStorage.getItem('settings'))
}