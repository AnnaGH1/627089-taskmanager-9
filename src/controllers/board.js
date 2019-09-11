import {createElement, render, unrender} from '../components/utils';
import {TASKS_COUNT, TASKS_PER_PAGE} from '../components/data';
import Board from '../components/board';
import TaskList from '../components/task-list';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import Load from '../components/load';
import {getCountByFlag} from '../components/search-filter';
import {getMessageTemplate} from '../components/message';
import {getFilterListTemplate, sortType} from '../components/filter-sort';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._load = new Load();
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    // Closes edit mode on Esc keydown
    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    // Open edit mode
    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (() => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      }));

    // Prevent close edit mode on Esc keydown when card is being edited
    taskEditComponent.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`focus`, (() => document.removeEventListener(`keydown`, onEscKeyDown)));

    // Allow close edit mode on Esc keydown when card is not edited
    taskEditComponent.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`blur`, (() => document.addEventListener(`keydown`, onEscKeyDown)));

    // Close edit mode
    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, (() => {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }));


    render(this._taskList.getElement(), taskComponent.getElement(), `beforeend`);
  }

  init() {
    // Show message if there are no tasks or all task are archived
    if (TASKS_COUNT === 0 || getCountByFlag(this._tasks, `isArchive`) === TASKS_COUNT) {
      render(this._container, this._board.getElement(), `beforeend`);
      render(this._board.getElement(), createElement(getMessageTemplate()), `beforeend`);
    } else {
      // Render sort and tasks otherwise
      render(this._container, this._board.getElement(), `beforeend`);
      render(this._board.getElement(), createElement(getFilterListTemplate(sortType)), `beforeend`);
      render(this._board.getElement(), this._taskList.getElement(), `beforeend`);
      let taskPageStart = 0;
      let taskPageEnd = TASKS_PER_PAGE;
      this._tasks.slice(taskPageStart, taskPageEnd).forEach((task) => this._renderTask(task));

      // Render Load button
      render(this._board.getElement(), this._load.getElement(), `beforeend`);

      this._load.getElement().addEventListener(`click`, () => {
        taskPageStart += TASKS_PER_PAGE;
        taskPageEnd += TASKS_PER_PAGE;
        if (taskPageEnd >= this._tasks.length) {
          unrender(this._load.getElement());
        }
        this._tasks.slice(taskPageStart, taskPageEnd).forEach((task) => this._renderTask(task));
      });
    }
  }
}

export {BoardController as default};
