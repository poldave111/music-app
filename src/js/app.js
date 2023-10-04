import { settings, select, classNames } from './settings.js';
import Home from './components/Home.js';







const app = {
    initPages: function() {
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        console.log(thisApp.pages);

        thisApp.navLinks = document.querySelectorAll(select.nav.links);
        console.log(thisApp.navLinks);

        const idFromHash = window.location.hash.replace('#/', '');

        let pageMatchingHash = thisApp.pages[0].id; 

        for(let page of thisApp.pages) {
            if(page.id == idFromHash) {
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash); 

        for (let link of thisApp.navLinks) {
            link.addEventListener('click', function(event) {
                const clickedElement = this;
                event.preventDefault();
                /* get page id from href attribute */
                const id = clickedElement.getAttribute('href').replace('#', '');

                /* run this App.activatePage with id */
                thisApp.activatePage(id);

                /* change URL hash */
                window.location.hash = '#/' + id
            });
        }
    },
    activatePage: function(pageId) {
        const thisApp = this; 

        /* add class "active" to matching pages, remove from non-matching */ 
        for(let page of thisApp.pages) {
            // if(page.id == pageId) {
            //     page.classList.add(classNames.pages.active);
            // } else {
            //     page.classList.remove(classNames.pages.active);
            // }
            page.classList.toggle(classNames.pages.active, page.id == pageId); // using with second argument as conditional in order to avoid writing whole long if statement.
        }
        /* add class "active" to matching links, remove from non-matching */
        for(let link of thisApp.navLinks) {
            link.classList.toggle(
                classNames.nav.active, 
                link.getAttribute('href') == '#' + pageId
            ); // using with second argument as conditional in order to avoid writing whole long if statement.
        }
    },
    activateCategories() {
        const thisApp = this;
        console.log('thisApp.data.songs', thisApp.data.songs);
        const uniqueCategories = [];
        thisApp.data.songs.forEach(song => {
            song.categories.forEach(category => {
                if(!uniqueCategories.includes(category)) {
                    uniqueCategories.push(category);
                }  
            })
        });
        let links = '';
        uniqueCategories.forEach(category => {
            links += `<a class="category" href="#${category}">${category}</a>`;
            //div.textContent = category;
            return links;
        });
 
        const categoriesWrapper = document.querySelector('.categories');
        // console.log('categoriesWrapper', categoriesWrapper);
        // categoryDivs.forEach(link => {
        //     console.log(link); 
        // })
        categoriesWrapper.innerHTML = links;
        //categoriesWrapper.insertAdjacentHTML(links);
        //console.log(categoryDivs);

        const linksCategories = document.querySelectorAll('.category');
        linksCategories.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if(!link.classList.contains('active')) {
                    linksCategories.forEach(link => link.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
                
            })
        })
    },
    initData: function() {
        const thisApp = this;
        thisApp.data = {};
        const url = settings.db.url + '/' + settings.db.songs;
        fetch(url)
            .then(function(rawResponse) {
                return rawResponse.json();
            })
            .then(function(parsedResponse) {
                thisApp.data.songs = parsedResponse;
                thisApp.home = new Home(thisApp.data.songs); 
                thisApp.activateCategories();
            })
    },
    initPlayer: function() {
        GreenAudioPlayer.init({
            selector: '.player', // inits Green Audio Player on each audio container that has class "player"
            stopOthersOnPlay: true
        });
    },

    init: function() {
        const thisApp = this;
        thisApp.initData();
        thisApp.initPages();
    },
}

app.init();