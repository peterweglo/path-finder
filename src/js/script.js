import PathFinder from './components/pathFinder.js';

const app = {
  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector('.container').children;
    thisApp.navLinks = document.querySelectorAll('nav a');
    const hashId = window.location.hash.replace('#/', '');

    let hashIdpageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages) {
      if (page.id == hashId) {
        hashIdpageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(hashIdpageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;
    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initPath() {
    const thisApp = this;
    thisApp.Pathfinder = new PathFinder();
  },

  init: function () {
    const thisApp = this;
    thisApp.initPages();
    thisApp.initPath();
  },
};

app.init();
