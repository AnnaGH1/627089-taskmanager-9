import {getTaskEditTemplate} from './task-edit.js';
import {getTasksTemplate} from './tasks.js';
import {getTask} from './data.js';

/**
 * Gets task edit and tasks template
 * @return {string}
 */
const getTaskEditAndTasksTemplate = () => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate(cardControlsEdit, days, colors, statusBtns));
  joinedTemplate.push(getTasksTemplate(tasks));
  return joinedTemplate.join(``);
};

const TASKS_COUNT = 5;
const days = [
  {
    name: `mo`,
    isChecked: false
  },
  {
    name: `tu`,
    isChecked: true
  },
  {
    name: `we`,
    isChecked: true
  },
  {
    name: `th`,
    isChecked: false
  },
  {
    name: `fr`,
    isChecked: false
  },
  {
    name: `sa`,
    isChecked: true
  },
  {
    name: `su`,
    isChecked: false
  }
];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const cardControlsEdit = [
  {
    name: `archive`,
    isDisabled: false
  },
  {
    name: `favorites`,
    isDisabled: false
  }
];
const statusBtns = [
  {
    name: `save`,
    type: `submit`
  },
  {
    name: `delete`,
    type: `button`
  }
];
const tasks = new Array(TASKS_COUNT).fill({}).map(getTask);

export {getTaskEditAndTasksTemplate};
