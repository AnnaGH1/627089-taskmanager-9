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
const getSearchAndFiltersTemplate = (filterData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getSearchTemplate());
  joinedTemplate.push(getFiltersTemplate(filterData));
  return joinedTemplate.join(``);
};

/**
 * Counts tasks by flag
 * @param {Array} tasksList
 * @param {string} flag
 * @return {number}
 */
const getCountByFlag = (tasksList, flag) => tasksList.filter((el) => el[flag]).length;

/**
 * Counts tasks with tags
 * @param {Array} tasksList
 * @return {number}
 */
const getCountWithTags = (tasksList) => tasksList.filter((el) => Array.from(el.tags).length > 1).length;

/**
 * Counts repeating tasks
 * @param {Array} tasksList
 * @param {Array} daysList
 * @return {number}
 */
const getCountRepeating = (tasksList, daysList) => {
  let count = 0;
  tasksList.forEach((el) => daysList.some((day) => el.repeatingDays[day]) ? count++ : count);
  return count;
};

/**
 * Counts tasks due today
 * @param {Array} tasksList
 * @return {number}
 */
const getCountDueToday = (tasksList) => tasksList.filter((el) => el.dueDate > Date.now() && el.dueDate < Date.now() + 24 * 60 * 60 * 1000).length;

/**
 * Counts tasks overdue
 * @param {Array} tasksList
 * @return {number}
 */
const getCountOverdue = (tasksList) => tasksList.filter((el) => el.dueDate < Date.now()).length;

export {getSearchAndFiltersTemplate, getCountByFlag, getCountWithTags, getCountRepeating, getCountDueToday, getCountOverdue};
