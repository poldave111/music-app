import { templates, select } from '../settings.js';
import { utils } from '../utils/utils.js';


class Search {
    constructor(data, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisSearch = this; 
        //thisSearch.getRightSongs(data)
        thisSearch.getElements();
        thisSearch.render(data);
        thisSearch.initActions(songs);
        thisSearch.prepareDataForCategories(songs);
        thisSearch.searchByCategory(songs);
       // thisSearch.prepareDataForCategories(songs);
       //thisSearch.generateSongs(songs);
    }

    getElements() {
       const thisSearch = this;
       thisSearch.searchContainer = document.querySelector('#search');
       console.log('thisSearch.searchContainer', thisSearch.searchContainer);
    }

    initActions(songs) {
        const thisSearch = this; 
        console.log('button', thisSearch.element.querySelector('button'));
        thisSearch.element.querySelector('button').addEventListener('click', () => {thisSearch.searchByTitle(songs)} );
        
    }

    hideAllPlayers() {
        const thisSearch = this; 
        thisSearch.element.querySelectorAll('.player').forEach((elem) => elem.classList.add('invisible'));
    }

    showSearchResults(filteredSongs) {
        const thisSearch = this;
        console.log('filteredSongs', filteredSongs);
        thisSearch.hideAllPlayers();
        const players = Array.from(thisSearch.element.querySelectorAll('.player'));
        console.log('players', players);
        filteredSongs.forEach((song) => {
            const player = players.find((player) =>  player.getAttribute('data-src') === song.filename);
            console.log('player', player);
            player.classList.remove('invisible');
        }) 
    }

    searchByTitle(songs) {
        const thisSearch = this; 
        const searchInput = document.getElementById('searchInput');
        //console.log('searchInput', searchInput);
        const searchValue = searchInput.value.trim();
        
        thisSearch.filteredSongs = songs.filter(song => {
            const lowerTitle = song.title.toLowerCase();
            const lowerSearchValue = searchValue.toLowerCase();
            return lowerTitle.includes(lowerSearchValue);
        });
        console.log('thisSearch.filtered', thisSearch.filteredSongs);
        thisSearch.showSearchResults(thisSearch.filteredSongs);
    }

    searchByCategory(songs) {
        const thisSearch = this;
        const categorySelect = document.getElementById("categorySelect");
        categorySelect.addEventListener("change", () => {
            const selectedCategory = categorySelect.value;
            const filteredSongs = songs.filter(song => song.categories.includes(selectedCategory));
            thisSearch.showSearchResults(filteredSongs);
        });
    }

    prepareDataForCategories(songs) {
        const thisSearch = this;
        const uniqueCategories = []; 
        songs.forEach(song => {
            song.categories.forEach(category => {
                if(!uniqueCategories.includes(category)) {
                    uniqueCategories.push(category);
                }
            });
        });
        thisSearch.generateCategories(uniqueCategories);
    }
    generateCategories(categories) {
        const thisSearch = this; 
        const container = document.querySelector(select.containerOf.categories);
        const generatedHTML = templates.categories({categories});
        thisSearch.dropdown = utils.createDOMFromHTML(generatedHTML);
        container.appendChild(thisSearch.dropdown);
    }

    render(data) {
        const thisSearch = this; 
        console.log('data', data)
        const generatedHTML = templates.search(data[0]);
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        thisSearch.searchContainer.appendChild(thisSearch.element);
    }

    // 1. Kolejno do zrobienia: 
    // - Przygotować funkcję do generowania piosenek według search (getRightSongs)
    // - przygotować metodę która podczepi playery do jakiegoś contenera w wygenerowanym html search
}

export default Search;