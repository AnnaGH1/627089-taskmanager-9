import {getTaskEditTemplate} from './task-edit.js';
import {getTasksTemplate} from './tasks.js';

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
const tasks = [
  {
    text: `Example default task with ${colors[0]} color.`,
    color: `${colors[0]}`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtag: [`personal`, `important`]
  },
  {
    text: `Example default task with ${colors[1]} color.`,
    color: `${colors[1]}`,
    date: `24 September`,
    time: `11:30 PM`,
    hashtag: [`todo`, `personal`, `important`]
  },
  {
    text: `Example default task with ${colors[4]} color.`,
    color: `${colors[4]}`,
    date: `25 September`,
    time: `11:50 PM`,
    hashtag: [`todo`, `important`]
  }
];

export {getTaskEditAndTasksTemplate};
