import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Discover {
    constructor(data, songs) { // constructor runs only once when class is instantiated!!!! 
        const thisHome = this; 
        thisHome.data = data; 
        thisHome.playEventCatcher(); 
        // thisHome.getElements();
        // thisHome.render(data);
    }

    playEventCatcher() {
        const audioEvents = document.querySelectorAll('audio');
        audioEvents.forEach((audioEvent) => {
            audioEvent.addEventListener('play', (e) => {console.log('uruchomiony', e)});
        })
        console.log('audioEvents', audioEvents);
    }

    // getElements() {
    //    const thisHome = this;
    //    thisHome.wrapper = document.querySelector('#home-wrapper');
    //    console.log(thisHome.wrapper);
    // }

    // render(data) {
    //     const thisHome = this;
    //     const generatedHTML = templates.home(data[0]);
    //     thisHome.element = utils.createDOMFromHTML(generatedHTML);
    //     thisHome.wrapper.appendChild(thisHome.element);
    // }
}

export default Discover;