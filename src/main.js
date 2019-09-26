import {tasks, filters} from './components/data';
import {Position, render} from './components/utils';
import BoardController from './controllers/board';
import Statistics from './components/statistics';
import SiteMenu from './components/site-menu';
import Search from './components/search';
import Filter from './components/filter';

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.control`);
const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter(filters);
const boardController = new BoardController(mainContainer, tasks);
const statistics = new Statistics();
statistics.getElement().classList.add(`visually-hidden`);

render(mainContainer, statistics.getElement(), Position.BEFOREEND);
render(controlContainer, siteMenu.getElement(), Position.BEFOREEND);
render(mainContainer, search.getElement(), Position.BEFOREEND);
render(mainContainer, filter.getElement(), Position.BEFOREEND);
boardController.init();

mainContainer.querySelector(`.main__control`)
  .addEventListener(`change`, (e) => {
    if (e.target.tagName !== `INPUT`) {
      return;
    }

    switch (e.target.id) {
      case `control__task`:
        statistics.getElement().classList.add(`visually-hidden`);
        boardController.show();
        break;
      case `control__statistic`:
        statistics.getElement().classList.remove(`visually-hidden`);
        boardController.hide();
        break;
    }
  });

