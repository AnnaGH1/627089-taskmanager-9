/**
 * Counts all tasks
 * @param {Array} tasks
 * @return {number}
 */
export const getCountAll = (tasks) => tasks.length;

/**
 * Counts tasks by flag
 * @param {Array} tasks
 * @param {string} flag
 * @return {number}
 */
export const getCountByFlag = (tasks, flag) => tasks.filter((el) => el[flag]).length;

/**
 * Counts tasks with tags
 * @param {Array} tasks
 * @return {number}
 */
export const getCountTags = (tasks) => tasks.filter((el) => [...el.tags].length > 1).length;

/**
 * Counts repeating tasks
 * @param {Array} tasks
 * @param {string} flag
 * @param {Array} days
 * @return {number}
 */
export const getCountRepeating = (tasks, flag, days) => {
  let count = 0;
  tasks.forEach((el) => days.some((day) => el.repeatingDays[day]) ? count++ : count);
  return count;
};

/**
 * Counts tasks due today
 * @param {Array} tasks
 * @return {number}
 */
export const getCountToday = (tasks) => tasks.filter((el) => el.dueDate > Date.now() && el.dueDate < Date.now() + 24 * 60 * 60 * 1000).length;

/**
 * Counts tasks overdue
 * @param {Array} tasks
 * @return {number}
 */
export const getCountOverdue = (tasks) => tasks.filter((el) => el.dueDate < Date.now()).length;

