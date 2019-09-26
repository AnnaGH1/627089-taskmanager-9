import {Position, createElement, render, unrender} from '../components/utils';
import {TASKS_COUNT, TASKS_PER_PAGE} from '../components/data';
import Board from '../components/board';
import TaskList from '../components/task-list';
import Load from '../components/load';
import Sort from '../components/sort';
import TaskController from "./task";
import {getCountByFlag} from '../components/search-filter';
import {getMessageTemplate} from '../components/message';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._load = new Load();
    this._sort = new Sort();
    this._taskPageStart = 0;
    this._taskPageEnd = TASKS_PER_PAGE;
    this._tasksSequence = null;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _renderBoardContainer() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
  }

  _renderTasksContainer() {
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
  }

  _renderMessage() {
    render(this._board.getElement(), createElement(getMessageTemplate()), Position.BEFOREEND);
  }

  _renderSort() {
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, this._onSortLinkClick.bind(this));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onViewChange);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _removePreviousTasks() {
    // Reset previous tasks sequence
    this._tasksSequence = null;

    // Remove previous tasks
    unrender(this._taskList.getElement());
    this._taskList.removeElement();

    // If rendered, remove load button corresponding to the previous tasks
    if (this._load._element) {
      unrender(this._load.getElement());
      this._load.removeElement();
    }
  }

  _resetPageCounters() {
    this._taskPageStart = 0;
    this._taskPageEnd = TASKS_PER_PAGE;
  }

  _renderTasks(tasksSequence) {
    this._removePreviousTasks();
    this._renderTasksContainer();
    this._resetPageCounters();
    this._tasksSequence = tasksSequence;
    this._tasksSequence.slice(this._taskPageStart, this._taskPageEnd).forEach((task) => this._renderTask(task));

    // Render Load button
    render(this._board.getElement(), this._load.getElement(), Position.BEFOREEND);
    this._load.getElement().addEventListener(`click`, this._onLoadButtonClick.bind(this));
  }

  hide() {
    this._board.getElement()
      .classList.add(`visually-hidden`);
  }

  show() {
    this._board.getElement()
      .classList.remove(`visually-hidden`);
  }

  init() {
    this._renderBoardContainer();

    // Show message if there are no tasks or all task are archived
    if (TASKS_COUNT === 0 || getCountByFlag(this._tasks, `isArchive`) === TASKS_COUNT) {
      this._renderMessage();
    } else {
      this._renderSort();
      this._renderTasksContainer();
      this._renderTasks(this._tasks);
    }
  }

  _onSortLinkClick(e) {
    e.preventDefault();
    if (e.target.tagName !== `A`) {
      return;
    }

    // Get tasks by sort type
    switch (e.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderTasks(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderTasks(sortedByDateDownTasks);
        break;
      case `default`:
        this._renderTasks(this._tasks);
        break;
    }
  }

  _onLoadButtonClick() {
    this._taskPageStart += TASKS_PER_PAGE;
    this._taskPageEnd += TASKS_PER_PAGE;
    if (this._taskPageEnd >= this._tasksSequence.length) {
      unrender(this._load.getElement());
      this._load.removeElement();
    }
    this._tasksSequence.slice(this._taskPageStart, this._taskPageEnd).forEach((task) => this._renderTask(task));
  }

  _onViewChange() {
    this._subscriptions.forEach((el) => el());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((el) => el === oldData)] = newData;
    this._renderTasks(this._tasks);
  }
}
