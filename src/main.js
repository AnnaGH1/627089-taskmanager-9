import {getMenuTemplate, controlContainer, mainMenu} from './components/main-menu.js';
import {mainContainer} from './components/main-container.js';
import {getSearchAndFiltersTemplate} from './components/search-filter';
import {renderComponent} from './components/rendering.js';
import {renderBoardContainer, boardContainer} from './components/board-container.js';
import {getFilterListTemplate, sortType} from './components/filter-sort.js';
import {renderTasksContainer} from './components/tasks-container.js';
import {getTaskEditAndTasksTemplate} from './components/tasks-all.js';
import {getLoadTemplate} from './components/load.js';
import {filters} from './components/data.js';

renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFiltersTemplate(filters));
renderBoardContainer();
renderComponent(boardContainer, getFilterListTemplate(sortType));
renderComponent(renderTasksContainer(), getTaskEditAndTasksTemplate());
renderComponent(boardContainer, getLoadTemplate());
