import {getTaskEditTemplate} from './task-edit.js';
import {getTasksTemplate, taskEditMode, tasksViewMode} from './tasks.js';
import {days, colors} from './data.js';

/**
 * Gets task edit and tasks template
 * @return {string}
 */
const getTaskEditAndTasksTemplate = () => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate(days, colors, taskEditMode));
  joinedTemplate.push(getTasksTemplate(tasksViewMode));
  return joinedTemplate.join(``);
};

export {getTaskEditAndTasksTemplate, colors, days};
