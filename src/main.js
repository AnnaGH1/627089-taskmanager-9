import {getMenuTemplate, controlContainer, mainMenu} from './components/main-menu.js';
import {mainContainer} from './components/main-container.js';
import {getSearchAndFiltersTemplate} from './components/search-filter';
import {renderComponent} from './components/rendering.js';
import {renderBoardContainer, boardContainer} from './components/board-container.js';
import {getFilterListTemplate, sortType} from './components/filter-sort.js';
import {renderTasksContainer, tasksContainer} from './components/tasks-container.js';
import {getTasksTemplate} from './components/tasks.js';
import {getTaskEditAndTasksTemplate, pages} from './components/tasks-all.js';
import {getLoadTemplate} from './components/load.js';
import {filters, tasks} from './components/data.js';
import {render, unrender, Position} from "./components/util";
import {Task} from "./components/task";

renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFiltersTemplate(filters));
renderBoardContainer();
renderComponent(boardContainer, getFilterListTemplate(sortType));
renderTasksContainer();

// renderComponent(renderTasksContainer(), getTaskEditAndTasksTemplate());
const renderTask = (taskData) => {
  const task = new Task(taskData);
  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

tasks.forEach((task) => renderTask(task));


// renderComponent(boardContainer, getLoadTemplate());
//
// let pageRendered = 0;
// const lastPageToRender = pages.length - 1;
//
// const loadMore = document.querySelector(`.load-more`);
// loadMore.addEventListener(`click`, () => {
//   pageRendered++;
//   if (pageRendered === lastPageToRender) {
//     boardContainer.removeChild(loadMore);
//   }
//   renderComponent(tasksContainer, getTasksTemplate(pages[pageRendered]));
// });
