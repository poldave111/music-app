import { templates } from '../settings.js';
import { utils } from '../utils/utils.js';


class Discover {
    constructor(uniqueCategories) { // constructor runs only once when class is instantiated!!!! 
        const thisDiscover = this; 
        thisDiscover.uniqueCategories = uniqueCategories;
        thisDiscover.categoriesObject = {};
        thisDiscover.playEventCatcher(); 
        thisDiscover.getElements();
        thisDiscover.initActions(); 
    }

    playEventCatcher() {
        const thisDiscover = this;
        const audioEvents = document.querySelectorAll('audio');
        thisDiscover.uniqueCategories.forEach((category) => {
            thisDiscover.categoriesObject[category] = 0;
        });
        audioEvents.forEach((audioEvent) => {
            audioEvent.addEventListener('play', (e) => {
                console.log('uruchomiony', e);
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
       console.log('ooo', thisDiscover.amazingButton);
    }

    initActions() {
        const thisDiscover = this;
        thisDiscover.amazingButton.addEventListener("click", function () {
            thisDiscover.findLowestValue();
            console.log(thisDiscover.categoriesObject);
        });
    }

    findLowestValue() {
        const thisDiscover = this;
        
        let lowestValue = 0;

        while(true) {
            const isThereAKey = Object.keys(thisDiscover.categoriesObject).filter((key) => thisDiscover.categoriesObject[key] === lowestValue);
            if(isThereAKey.length !== 0) {
                lowestValue++;
            } else {
                break;
            }
        }
        console.log(lowestValue);
        return lowestValue;
    }
    // render(data) {
    //     const thisDiscover = this;
    //     const generatedHTML = templates.home(data[0]);
    //     thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
    //     thisDiscover.wrapper.appendChild(thisDiscover.element);
    // }
}

export default Discover;