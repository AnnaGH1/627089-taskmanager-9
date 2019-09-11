import {getMenuTemplate, controlContainer, mainMenu} from './components/main-menu.js';
import {mainContainer} from './components/main-container.js';
import {getSearchAndFiltersTemplate, getCountByFlag} from './components/search-filter';
import {renderComponent} from './components/rendering.js';
import {renderBoardContainer, boardContainer} from './components/board-container.js';
import {getFilterListTemplate, sortType} from './components/filter-sort.js';
import {renderTasksContainer, tasksContainer} from './components/tasks-container.js';
import {getLoadTemplate} from './components/load.js';
import {getMessageTemplate} from "./components/message";
import {TASKS_COUNT, TASKS_PER_PAGE, tasks, filters} from './components/data.js';
import {createElement, render} from "./components/utils";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";

renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFiltersTemplate(filters));
renderBoardContainer();

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


  render(tasksContainer, task.getElement(), `beforeend`);
};

// Show message if there are no tasks or all task are archived
if (TASKS_COUNT === 0 || getCountByFlag(tasks, `isArchive`) === TASKS_COUNT) {
  render(boardContainer, createElement(getMessageTemplate()), `beforeend`);
} else {
  // Render tasks otherwise
  renderComponent(boardContainer, getFilterListTemplate(sortType));
  renderTasksContainer();
  let taskPageStart = 0;
  let taskPageEnd = TASKS_PER_PAGE;
  tasks.slice(taskPageStart, taskPageEnd).forEach((task) => renderTask(task));

  renderComponent(boardContainer, getLoadTemplate());

  const loadMore = document.querySelector(`.load-more`);
  loadMore.addEventListener(`click`, () => {
    taskPageStart += TASKS_PER_PAGE;
    taskPageEnd += TASKS_PER_PAGE;
    if (taskPageEnd >= tasks.length) {
      boardContainer.removeChild(loadMore);
    }
    tasks.slice(taskPageStart, taskPageEnd).forEach((task) => renderTask(task));
  });
}
