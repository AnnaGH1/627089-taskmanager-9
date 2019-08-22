import {getTaskEditTemplate} from './task-edit.js';
import {getTasksTemplate} from './tasks.js';
import {days, colors, tasks, TASKS_PER_PAGE} from './data.js';

const taskEditMode = tasks[0];
const pages = [];

/**
 * Groups tasks into pages
 * @param {Array} tasksData
 * @return {[]}
 */
const groupTasksIntoPages = (tasksData) => {
  const tasksCopy = tasksData.slice();
  while (tasksCopy.length > 0) {
    let page = tasksCopy.splice(0, TASKS_PER_PAGE);
    pages.push(page);
  }
  return pages;
};

groupTasksIntoPages(tasks);

/**
 * Gets task edit and tasks template
 * @return {string}
 */
const getTaskEditAndTasksTemplate = () => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate(days, colors, taskEditMode));
  joinedTemplate.push(getTasksTemplate(pages[0]));
  return joinedTemplate.join(``);
};

export {getTaskEditAndTasksTemplate, colors, days, pages, taskEditMode};
