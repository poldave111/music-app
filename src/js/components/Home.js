import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Home {
    constructor(data) { // constructor runs only once when class is instantiated!!!! 
        const thisHome = this; 
        thisHome.data = data; 
        console.log(data);
        thisHome.render(data);
    }

    getElements() {
       const thisHome = this;
    }

    render(data) {
        const thisHome = this;
        thisHome.playerContainer = document.querySelector('.home');
        data.map((song) => {
            const generatedPlayer = templates.player(song)
            let player = utils.createDOMFromHTML(generatedPlayer);
            thisHome.playerContainer.appendChild(player);
        })
    }
}

export default Home;