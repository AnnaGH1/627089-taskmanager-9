import {getRandEls} from "./utils";
import {getCountAll, getCountByFlag, getCountTags, getCountRepeating, getCountToday, getCountOverdue} from "./search-filter.js";

const TASKS_COUNT = 18;
const TASKS_PER_PAGE = 8;
const TAGS_MAX = 3;
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const TAGS = [`personal`, `important`, `homework`, `theory`, `practice`, `intensive`, `keks`, `summer`, `travel`];
const FILTERS = {
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
    isFavorites: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
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
    const flag = `is${key.charAt(0).toUpperCase() + key.slice(1)}`;
    filters.push({
      title: key,
      count: filtersData[key](tasks, flag, DAYS),
      isChecked: false,
      isDisabled: false,
    });
  });
  return filters;
};

const tasks = new Array(TASKS_COUNT).fill({}).map(getTask);
const filters = getFilters(FILTERS);

export {DAYS, COLORS, tasks, filters, TASKS_PER_PAGE};
