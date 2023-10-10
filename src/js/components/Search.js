import { templates, select } from '../settings.js';
import { utils } from '../utils/utils.js';


class Search {
    constructor(data, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisSearch = this; 
        //thisSearch.getRightSongs(data)
        thisSearch.getElements();
        thisSearch.render(data);
        thisSearch.initActions(songs);
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
        thisSearch.element.querySelector('button').addEventListener('click', () => {thisSearch.getRightSongs(songs)} );
        
    }

    hideAllPlayers() {
        const thisSearch = this; 
        thisSearch.element.querySelectorAll('.player').forEach((elem) => elem.classList.add('invisible'));
    }

    getRightSongs(songs) {
        const thisSearch = this; 
        const searchInput = document.getElementById('searchInput');
        //console.log('searchInput', searchInput);
        const searchValue = searchInput.value.trim();
        thisSearch.hideAllPlayers();
        thisSearch.filteredSongs = songs.filter(song => {
            const lowerTitle = song.title.toLowerCase();
            const lowerSearchValue = searchValue.toLowerCase();
            return lowerTitle.includes(lowerSearchValue);
        });
        //console.log('filteredSongs', thisSearch.filteredSongs);

        const players = Array.from(thisSearch.element.querySelectorAll('.player'));
        console.log('players', players);
        thisSearch.filteredSongs.forEach((song) => {
            const player = players.find((player) =>  player.getAttribute('data-src') === song.filename);
            player.classList.remove('invisible');
        }) 

        // rightSongs.map((song) => {
        //     let element = thisSearch.element.querySelector(`source[src="${song}"]`);
        //     let elem = element.closest('.player.green-audio-player');
        //     elem.classList.add("invisible");
        //     // console.log('element', element);
        //     // console.log('elem', elem);
        // })

        // console.log(rightSongs);
        
        // console.log(players[0].getAttribute("src"));
        // const containerSongSearch =  document.querySelector('.searchPlayers');
        // console.log(containerSongSearch);
        // thisSearch.generateSongs(thisSearch.filteredSongs, containerSongSearch);
        // from data choose according to search appriopriate data, 
        // make any change in input field start this method, (eventListener?)
    }

    // generateSongs(songs, container) {
    //     const thisSearch = this;
    //     console.log('container', container);
    //     songs.map((song) => {
    //         const generatedPlayer = templates.player(song)
    //         let player = utils.createDOMFromHTML(generatedPlayer);
    //         container.appendChild(player);
    //     });
    //     thisSearch.hookPlayers();
    // }

    // hookPlayers() {
    //     //console.log('hookplayers ruszyło');
    //     GreenAudioPlayer.init({
    //         selector: '.player',
    //         stopOthersOnPlay: true
    //     });
    // }

    // prepareDataForCategories(songs) {
    //     const thisSearch = this; 
    //     const uniqueCategories = { categories: [] };

    //     songs.forEach(song => {
    //         song.categories.forEach(category => {
    //             if (!uniqueCategories.categories.includes(category)) {
    //                 uniqueCategories.categories.push(category);
    //             }
    //         });
    //     });
    //     thisSearch.generateCategories(uniqueCategories);
    // }
    generateCategories(categories) {
        const thisSearch = this; 
        //const container = document.querySelector(select.containerOf.categories);
        const generatedHTML = templates.categories(categories);
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        container.appendChild(thisSearch.element);
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