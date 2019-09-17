/**
 * Gets search template
 * @return {string}
 */
const getSearchTemplate = () => `
  <section class="main__search search container">
      <input
        type="text"
        id="search__input"
        class="search__input"
        placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
      />
      <label class="visually-hidden" for="search__input">Search</label>
  </section>
`;

/**
 * Gets filter template
 * @param {Object} filterItem
 * @return {string}
 */
const getFilterTemplate = ({title, count, isChecked, isDisabled}) => `
  <input
    type="radio"
    id="filter__${title}"  
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked && `checked`}
    ${isDisabled && `disabled`}
  />
  <label for="filter__${title}" class="filter__label">
    ${title} <span class="filter__${title}-count">${count}</span></label
  >
`;

/**
 * Gets filters template
 * @param {Object} filterData
 * @return {string}
 */
const getFiltersTemplate = (filterData) => `
  <section class="main__filter filter container">
    ${filterData.map(getFilterTemplate).join(``)}
  </section>
`;

/**
 * Gets search and filters template
 * @param {Object} filterData
 * @return {string}
 */
export const getSearchAndFiltersTemplate = (filterData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getSearchTemplate());
  joinedTemplate.push(getFiltersTemplate(filterData));
  return joinedTemplate.join(``);
};

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

