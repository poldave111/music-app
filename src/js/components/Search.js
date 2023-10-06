import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Search {
    constructor(data, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisSearch = this; 
        //thisSearch.getRightSongs(data)
        thisSearch.getElements();
        thisSearch.render(data);
        thisSearch.initActions(songs);
    }

    getElements() {
       const thisSearch = this;
       thisSearch.searchContainer = document.querySelector('.search');
    }

    initActions(songs) {
        const thisSearch = this; 
        thisSearch.element.querySelector('button').addEventListener('click', () => {thisSearch.getRightSongs(songs)} );

    }

    getRightSongs(songs) {
        const thisSearch = this; 
        const searchInput = document.getElementById('searchInput');
        console.log('searchInput', searchInput);
        const searchValue = searchInput.value.trim();

        thisSearch.filteredSongs = songs.filter(song => {
            const lowerTitle = song.title.toLowerCase();
            const lowerSearchValue = searchValue.toLowerCase();
            return lowerTitle.includes(lowerSearchValue);
        });
        console.log('filteredSongs', thisSearch.filteredSongs);
        const containerSongSearch =  document.querySelector('.searchPlayers');
        console.log(containerSongSearch);
        thisSearch.generateSongs(thisSearch.filteredSongs, containerSongSearch);
        // from data choose according to search appriopriate data, 
        // make any change in input field start this method, (eventListener?)
    }

    generateSongs(songs, container) {
        let html = '';
        songs.map((song) => {
            const generatedPlayer = templates.player(song)
            let player = utils.createDOMFromHTML(generatedPlayer);
            container.appendChild(player);
        });
    }

    render(data) {
        const thisSearch = this; 
        const generatedHTML = templates.search(data[0]);
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        thisSearch.searchContainer.appendChild(thisSearch.element);
    }

    // 1. Kolejno do zrobienia: 
    // - Przygotować funkcję do generowania piosenek według search (getRightSongs)
    // - przygotować metodę która podczepi playery do jakiegoś contenera w wygenerowanym html search
}

export default Search;