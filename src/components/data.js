import {capitalizeFirstLetter, getRandEls} from "./utils";
import {getCountAll, getCountByFlag, getCountTags, getCountRepeating, getCountToday, getCountOverdue} from "./search-filter.js";

export const TASKS_COUNT = 18;
export const TASKS_PER_PAGE = 8;
const TAGS_MAX = 3;
export const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const TAGS = [`personal`, `important`, `homework`, `theory`, `practice`, `intensive`, `keks`, `summer`, `travel`];
const filterMap = {
  all: getCountAll,
  overdue: getCountOverdue,
  today: getCountToday,
  favorites: getCountByFlag,
  repeating: getCountRepeating,
  tags: getCountTags,
  archive: getCountByFlag,
};

/**
 * Gets days schedule
 * @param {Array} items
 * @return {Object}
 */
const getDays = (items) => {
  const daysSchedule = {};
  items.forEach((item) => {
    daysSchedule[item] = Boolean(Math.round(Math.random()));
  });
  return daysSchedule;
};

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
    tags: new Set(getRandEls(TAGS, TAGS_MAX)),
    repeatingDays: getDays(DAYS),
    color: COLORS[Math.floor(Math.random() * 5)],
  }
);

/**
 * Gets filters
 * @param {Object} filtersData - titles and count functions
 * @return {Array}
 */
const getFilters = (filtersData) => {
  const filters = [];
  Object.keys(filtersData).forEach((key) => {
    const flag = `is${capitalizeFirstLetter(key)}`;
    filters.push({
      title: key,
      count: filtersData[key](tasks, flag, DAYS),
      isChecked: false,
      isDisabled: false,
    });
  });
  return filters;
};

export const tasks = new Array(TASKS_COUNT).fill({}).map(getTask);
export const filters = getFilters(filterMap);
