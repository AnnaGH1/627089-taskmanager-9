import {getRandEls} from "./util";
import {getCountByFlag, getCountWithTags, getCountRepeating, getCountDueToday, getCountOverdue} from "./search-filter.js";

/**
 * Gets random task
 * @return {{repeatingDays: {}, color: *, dueDate: number, text: *, tags: *}}
 */
const getTask = () => (
  {
    text: [
      `Prepare for the pitch`,
      `Find money for travel`,
      `Eat something`,
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    tags: new Set(getRandEls(tags, TAGS_MAX)),
    repeatingDays: {
      [days[0]]: Boolean(Math.round(Math.random())),
      [days[1]]: Boolean(Math.round(Math.random())),
      [days[2]]: Boolean(Math.round(Math.random())),
      [days[3]]: Boolean(Math.round(Math.random())),
      [days[4]]: false,
      [days[5]]: false,
      [days[6]]: false,
    },
    color: colors[Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  }
);

const TASKS_COUNT = 5;
const TAGS_MAX = 3;
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const tags = [`personal`, `important`, `homework`, `theory`, `practice`, `intensive`, `keks`, `summer`, `travel`];
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
const filters = [
  {
    title: `all`,
    count: getCountByFlag(tasks, `text`),
    isChecked: true,
    isDisabled: false
  },
  {
    title: `overdue`,
    count: getCountOverdue(tasks),
    isChecked: false,
    isDisabled: true
  },
  {
    title: `today`,
    count: getCountDueToday(tasks),
    isChecked: false,
    isDisabled: true
  },
  {
    title: `favorites`,
    count: getCountByFlag(tasks, `isFavorite`),
    isChecked: false,
    isDisabled: false
  },
  {
    title: `repeating`,
    count: getCountRepeating(tasks, days),
    isChecked: false,
    isDisabled: false
  },
  {
    title: `tags`,
    count: getCountWithTags(tasks),
    isChecked: false,
    isDisabled: false
  },
  {
    title: `archive`,
    count: getCountByFlag(tasks, `isArchive`),
    isChecked: false,
    isDisabled: false
  }
];

export {days, colors, statusBtns, tasks, filters};
