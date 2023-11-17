import { fetchNewAlbums } from "../api/album";

export async function fetchLimitNewAlbums(limit) {
    const albums = await fetchNewAlbums().then(res => res.albums)
    return albums.slice(0,limit)
}