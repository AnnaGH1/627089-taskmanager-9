import {getMenuTemplate, controlContainer, mainMenu} from './components/main-menu.js';
import {mainContainer} from './components/main-container.js';
import {getSearchAndFiltersTemplate} from './components/search-filter';
import {renderComponent} from './components/rendering.js';
import {renderBoardContainer, boardContainer} from './components/board-container.js';
import {getFilterListTemplate, sortType} from './components/filter-sort.js';
import {renderTasksContainer, tasksContainer} from './components/tasks-container.js';
import {pages} from './components/tasks-all.js';
import {getLoadTemplate} from './components/load.js';
import {filters} from './components/data.js';
import {render, unrender, Position} from "./components/util";
import {Task} from "./components/task";
import {TaskEdit} from "./components/task-edit";

renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFiltersTemplate(filters));
renderBoardContainer();
renderComponent(boardContainer, getFilterListTemplate(sortType));
renderTasksContainer();

const renderTask = (taskData) => {
  const task = new Task(taskData);
  const taskEdit = new TaskEdit(taskData);

  // Closes edit mode on Esc keydown
  const onEscKeyDown = (e) => {
    if (e.key === `Escape` || e.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  // Open edit mode
  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, (() => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    }));

  // Prevent close edit mode on Esc keydown when card is being edited
  taskEdit.getElement()
    .querySelector(`.card__text`)
    .addEventListener(`focus`, (() => document.removeEventListener(`keydown`, onEscKeyDown)));

  // Allow close edit mode on Esc keydown when card is not edited
  taskEdit.getElement()
    .querySelector(`.card__text`)
    .addEventListener(`blur`, (() => document.addEventListener(`keydown`, onEscKeyDown)));

  // Close edit mode
  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, (() => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }));


  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

pages[0].forEach((task) => renderTask(task));

renderComponent(boardContainer, getLoadTemplate());

let pageRendered = 0;
const lastPageToRender = pages.length - 1;

const loadMore = document.querySelector(`.load-more`);
loadMore.addEventListener(`click`, () => {
  pageRendered++;
  if (pageRendered === lastPageToRender) {
    boardContainer.removeChild(loadMore);
  }
  pages[pageRendered].forEach((task) => renderTask(task));
});
