export default store => {
    store.subscribe((mutation, state) => {
        console.log('mutation',mutation)
        console.log('更新settings');
        localStorage.setItem('settings',JSON.stringify(state.settings))
    })
}