import { settings, select, classNames, templates } from './settings.js';
import { utils } from './utils/utils.js';
import Home from './components/Home.js';
import Search from './components/Search.js'
import Discover from './components/Discover.js';

export const app = {
    initPages: function () {
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        // console.log(thisApp.pages);

        thisApp.navLinks = document.querySelectorAll(select.nav.links);
        // console.log(thisApp.navLinks);

        const idFromHash = window.location.hash.replace('#/', '');

        let pageMatchingHash = thisApp.pages[0].id;

        for (let page of thisApp.pages) {
            if (page.id == idFromHash) {
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);

        for (let link of thisApp.navLinks) {
            link.addEventListener('click', function (event) {
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
    activatePage: function (pageId) {
        const thisApp = this;
        if(pageId === 'home') {
            thisApp.categoriesWrapper.classList.add('active');
        } else {
            thisApp.categoriesWrapper.classList.remove('active');
        }
        /* add class "active" to matching pages, remove from non-matching */
        for (let page of thisApp.pages) {
            page.classList.toggle(classNames.pages.active, page.id == pageId); // using with second argument as conditional in order to avoid writing whole long if statement.
        }
        /* add class "active" to matching links, remove from non-matching */
        for (let link of thisApp.navLinks) {
            link.classList.toggle(
                classNames.nav.active,
                link.getAttribute('href') == '#' + pageId
            ); // using with second argument as conditional in order to avoid writing whole long if statement.
        }
        if(pageId === "search") {
            thisApp.search.hideAllPlayers();       
        }
    },
    activateCategories() {
        const thisApp = this;
        //console.log('thisApp.data.songs', thisApp.data.songs);
        thisApp.uniqueCategories = [];
        thisApp.data.songs.forEach(song => {
            song.categories.forEach(category => {
                if (!thisApp.uniqueCategories.includes(category)) {
                    thisApp.uniqueCategories.push(category);
                }
            })
        });
        let links = '';
        thisApp.uniqueCategories.forEach(category => {
            links += `<a class="category" href="#${category}">${category}</a>`;
            return links;
        });

        thisApp.categoriesWrapper = document.querySelector('.categories');
   
        thisApp.categoriesWrapper.innerHTML = links;
        const linksCategories = document.querySelectorAll('.category');
        linksCategories.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (!link.classList.contains('active')) {
                    linksCategories.forEach(link => link.classList.remove('active'));
                    link.classList.add('active');
                    thisApp.home.showPlayersByCategory(link.innerText);
                } else {
                    link.classList.remove('active');
                }

            })
        })
    },
    initData: function () {
        const thisApp = this;
        thisApp.data = {};
        const urls = {
            songs: settings.db.url + '/' + settings.db.songs,
            search: settings.db.url + '/' + settings.db.search,
            home: settings.db.url + '/' + settings.db.home,
        }

        Promise.all([
            fetch(urls.songs),
            fetch(urls.search),
            fetch(urls.home),
        ]).then(function (allResponses) {
            const songsResponse = allResponses[0];
            const searchResponse = allResponses[1];
            const homeResponse = allResponses[2];
                return Promise.all([
                    songsResponse.json(), 
                    searchResponse.json(),
                    homeResponse.json(),
                ]);
            })
            .then(function ([songs, search, home]) {
                thisApp.data.songs = songs;
                thisApp.data.search = search;
                thisApp.data.home = home;
                thisApp.home = new Home(thisApp.data.home, thisApp.data.songs);
                thisApp.search = new Search(thisApp.data.search, thisApp.data.songs);
                thisApp.activateCategories();
                thisApp.generateSongs(thisApp.data.songs);
                thisApp.initPlayer();
                thisApp.home.showAllPlayers();
                thisApp.initPages();
                thisApp.discover = new Discover(thisApp.uniqueCategories, thisApp.data.songs);
            });
    },
    generateSongs: function(songs) {
        const thisApp = this;
        const container = document.querySelectorAll('.players');
        console.log('container', container);
        songs.map((song) => {
            const generatedPlayer = templates.player(song);
            container.forEach((cont) => {
                let player = utils.createDOMFromHTML(generatedPlayer);
                cont.appendChild(player);
            });
        });
    },

    initPlayer: function (selector = '.player') {
        GreenAudioPlayer.init({
            selector,
            stopOthersOnPlay: true
        });
    },

    init: function () {
        const thisApp = this;
        thisApp.initData();
    },
}

app.init();