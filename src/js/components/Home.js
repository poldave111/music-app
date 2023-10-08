import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Home {
    constructor(data) { // constructor runs only once when class is instantiated!!!! 
        const thisHome = this; 
        thisHome.data = data; 
        console.log('home data', data);
        thisHome.getElements();
        thisHome.render(data);
    }

    getElements() {
       const thisHome = this;
       thisHome.wrapper = document.querySelector('#home-wrapper');
       console.log(thisHome.wrapper);
    }

    render() {
        const thisHome = this;
        const generatedHTML = templates.home();
        thisHome.element = utils.createDOMFromHTML(generatedHTML);
        thisHome.wrapper.appendChild(thisHome.element);
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