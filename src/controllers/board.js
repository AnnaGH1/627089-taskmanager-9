import {Position, Key, createElement, render, unrender} from '../components/utils';
import {TASKS_COUNT, TASKS_PER_PAGE} from '../components/data';
import Board from '../components/board';
import TaskList from '../components/task-list';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import Load from '../components/load';
import Sort from '../components/sort';
import {getCountByFlag} from '../components/search-filter';
import {getMessageTemplate} from '../components/message';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._load = new Load();
    this._sort = new Sort();
    this._taskPageStart = 0;
    this._taskPageEnd = TASKS_PER_PAGE;
  }

  /**
   * Renders a task and attaches event handlers
   * @param {Object} task
   * @private
   */
  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    // Closes edit mode on Esc keydown
    const onEscKeyDown = (e) => {
      if (e.key === Key.ESCAPE_IE || e.key === Key.ESCAPE) {
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


    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }

  /**
   * Sort event handler
   * @param {Object} e
   * @private
   */
  _onSortLinkClick(e) {
    e.preventDefault();
    if (e.target.tagName !== `A`) {
      return;
    }

    // Clear tasks and load button
    this._taskList.getElement().innerHTML = ``;
    unrender(this._load.getElement());

    // Get tasks by sort type
    switch (e.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderTasksAndLoadButton(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderTasksAndLoadButton(sortedByDateDownTasks);
        break;
      case `default`:
        this._renderTasksAndLoadButton(this._tasks);
        break;
    }
  }

  /**
   * Renders tasks in particular order and load more button
   * @param {Array} tasksSequence
   * @private
   */
  _renderTasksAndLoadButton(tasksSequence) {
    let taskPageStart = this._taskPageStart;
    let taskPageEnd = this._taskPageEnd;
    tasksSequence.slice(taskPageStart, taskPageEnd).forEach((task) => this._renderTask(task));

    // Render Load button
    render(this._board.getElement(), this._load.getElement(), Position.BEFOREEND);
    this._load.getElement().addEventListener(`click`, () => {
      taskPageStart += TASKS_PER_PAGE;
      taskPageEnd += TASKS_PER_PAGE;
      if (taskPageEnd >= tasksSequence.length) {
        unrender(this._load.getElement());
      }
      tasksSequence.slice(taskPageStart, taskPageEnd).forEach((task) => this._renderTask(task));
    });
  }

  /**
   * Renders page with tasks of no tasks message
   */
  init() {
    // Show message if there are no tasks or all task are archived
    if (TASKS_COUNT === 0 || getCountByFlag(this._tasks, `isArchive`) === TASKS_COUNT) {
      render(this._container, this._board.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), createElement(getMessageTemplate()), Position.BEFOREEND);
    } else {
      // Render board container
      render(this._container, this._board.getElement(), Position.BEFOREEND);

      // Render sort
      render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
      this._sort.getElement().addEventListener(`click`, (e) => {
        this._onSortLinkClick(e);
      });

      // Render tasks container
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

      // Render tasks and load button
      this._renderTasksAndLoadButton(this._tasks);
    }
  }
}

export {BoardController as default};
