import { getHotPlayListCats } from "../api/cat";
let enabledPlaylistCategories = 'null'
let localStorage = {
    settings: {
        enabledPlaylistCategories,
    }
}
export default localStorage;