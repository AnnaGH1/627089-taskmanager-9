import {tasks, TASKS_PER_PAGE} from './data.js';

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

export {pages, taskEditMode};
