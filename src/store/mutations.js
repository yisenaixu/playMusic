export default {
    updateUserData(state, {key,value}){
        state.userData[key] = value
    },
    updateSettings(state, { key, value }) {
        state.settings[key] = value;
      },
    togglePlaylistCategory(state, name) {
        const index =  state.settings.enabledPlaylistCategories.findIndex(
            c => c === name
        );
        console.log(index);
        if(index === -1){
        state.settings.enabledPlaylistCategories.push(name);
        } else {
            state.settings.enabledPlaylistCategories = state.settings.enabledPlaylistCategories.filter(c => c !== name)
        }

    },
    updateLikedXXX(state, {name, data}) {
        state.liked[name] = data;
    },
    updateDailyTracks(state, dailyTracks) {
        state.dailyTracks = dailyTracks;
    }
}