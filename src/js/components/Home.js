import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Home {
    constructor(data, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisHome = this; 
        thisHome.data = data; 
        thisHome.getElements();
        thisHome.render(data);
    }

    getElements() {
       const thisHome = this;
       thisHome.wrapper = document.querySelector('#home-wrapper');
    }
    
    showAllPlayers() {
        const thisHome = this;
        thisHome.allHomePlayers.forEach((homePlayer) => { 
            homePlayer.classList.add('active');
        });
    }

    showPlayersByCategory(category) {
        const thisHome = this;  
        thisHome.allHomePlayers.forEach((homePlayer) => {
            const audioElement = homePlayer.querySelector('audio');
            console.log(audioElement.getAttribute('data-categories'));
            if(audioElement.getAttribute('data-categories').includes(category)) {
                homePlayer.classList.add('active');
            } else {
                homePlayer.classList.remove('active');
            }
            console.log(homePlayer);
        })
        console.log('show players by category method in Home.js', category);
    }

    render(data) {
        const thisHome = this;
        const generatedHTML = templates.home(data[0]);
        thisHome.element = utils.createDOMFromHTML(generatedHTML);
        thisHome.wrapper.appendChild(thisHome.element);
        thisHome.allHomePlayers = thisHome.wrapper.querySelectorAll('.player');
    }


    // render(data) {
    //     const thisHome = this;
    //     //thisHome.playerContainer = document.querySelector('.home');
    //     // data.map((song) => {
    //     //     const generatedPlayer = templates.player(song)
    //     //     let player = utils.createDOMFromHTML(generatedPlayer);
    //     //     thisHome.playerContainer.appendChild(player);
    //     // })
    // }


}

export default Home;

// generować na wszystkich stronach playery (może jedną funkcją w app.js?), potem na elemencie ( i tylko na tym elemencie)
// search wyszukać wszystkie elementy player, i dodawać i zdejmować klasę active z elementów które mają być wygenerowane a 
// które nie. 