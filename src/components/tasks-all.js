import {getTaskEditTemplate} from './task-edit.js';
import {getTasksTemplate} from './tasks.js';
import {days, colors, statusBtns, tasks} from './data.js';

/**
 * Gets task edit and tasks template
 * @return {string}
 */
const getTaskEditAndTasksTemplate = () => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate(days, colors, statusBtns, tasks[0]));
  joinedTemplate.push(getTasksTemplate(tasks));
  return joinedTemplate.join(``);
};

export {getTaskEditAndTasksTemplate, colors, days};
