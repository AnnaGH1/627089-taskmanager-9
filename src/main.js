import {getMenuTemplate, controlContainer, mainMenu} from './components/main-menu';
import {getSearchAndFiltersTemplate} from './components/search-filter';
import {renderComponent} from './components/rendering';
import {tasks, filters} from './components/data';
import BoardController from './controllers/board';

const mainContainer = document.querySelector(`.main`);
const boardController = new BoardController(mainContainer, tasks);
renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFiltersTemplate(filters));
boardController.init();
