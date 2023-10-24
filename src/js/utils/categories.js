export function findSongsByCategory(category, songs) {
    return songs.filter((song) => {
        return song.categories.includes(category);
    })
}