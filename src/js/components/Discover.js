import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';
import { findSongsByCategory } from '../utils/categories.js';
import { app } from '../app.js';


class Discover {
    constructor(uniqueCategories, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisDiscover = this; 
        thisDiscover.uniqueCategories = uniqueCategories;
        thisDiscover.songs = songs;
        thisDiscover.categoriesObject = {};
        thisDiscover.playEventCatcher(); 
        thisDiscover.getElements();
        thisDiscover.initActions(); 
    }

    playEventCatcher() {
        const thisDiscover = this;
        const audioEvents = document.querySelectorAll('audio'); // querySelectorAll i querySelector szukają w danym momencie, co innego getELementByClassName lub by getElementByTag szukają przy każdej zmianie
        thisDiscover.uniqueCategories.forEach((category) => {
            thisDiscover.categoriesObject[category] = 0;
        });
        audioEvents.forEach((audioEvent) => {
            audioEvent.addEventListener('play', (e) => {
                console.log('uruchomiony', e.target, e.currentTarget);
                const categories = e.target.getAttribute('data-categories');
                console.log('categories', categories);
                categories.split(',').forEach((category) => {
                    thisDiscover.categoriesObject[category]++;
                    // if(thisDiscover.categoriesObject[category]) {
                    //     thisDiscover.categoriesObject[category]++;
                    // } else {
                    //     thisDiscover.categoriesObject[category] = 1; 
                    // }
                });
            });
        })
    }

    getElements() {
       const thisDiscover = this;
       thisDiscover.wrapper = document.querySelector('#discover-wrapper');
       thisDiscover.amazingButton = thisDiscover.wrapper.querySelector('.amazingButton');
       thisDiscover.playerWrapper = thisDiscover.wrapper.querySelector('.amazingPlayers');
    }

    initActions() {
        const thisDiscover = this;
        thisDiscover.amazingButton.addEventListener("click", function () {
            const lowestValue = thisDiscover.findLowestValue();
            const leastUsedCategory = Object.keys(thisDiscover.categoriesObject).find((key) => { // szukamy pierwszej kategorii która ma najniższą liczbę odtworzeń
                return thisDiscover.categoriesObject[key] === lowestValue;
            })
            const foundSongs = findSongsByCategory(leastUsedCategory, thisDiscover.songs);
            let songToShow; 
            if(foundSongs.length === 1) {
                songToShow = foundSongs[0];
            } else {
                songToShow = foundSongs[Math.floor(Math.random() * foundSongs.length)];
            }
            thisDiscover.render(songToShow);

            app.initPlayer('.amazingPlayers .player');
            
            console.log('fyi', songToShow);
            console.log('foundSongs', foundSongs);
            console.log(leastUsedCategory);
            console.log(thisDiscover.categoriesObject);
        });
    }

    findLowestValue() {
        const thisDiscover = this;
        
        let lowestValue = 0;

        while(true) {
            const isThereAKey = Object.keys(thisDiscover.categoriesObject).filter((key) => thisDiscover.categoriesObject[key] === lowestValue);
            if(isThereAKey.length === 0) {
                lowestValue++;
            } else {
                break;
            }
        }
        return lowestValue;
    }
    render(songToShow) {
        const thisDiscover = this;
        const generatedHTML = templates.player(songToShow);
        thisDiscover.playerWrapper.innerHTML = generatedHTML;
    }
}

export default Discover;