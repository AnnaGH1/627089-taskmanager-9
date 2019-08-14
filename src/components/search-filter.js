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
 * Gets filter item template
 * @param {Object} filterItem
 * @return {string}
 */
const getFilterItemTemplate = (filterItem) => `
  <input
    type="radio"
    id="filter__${filterItem.name}"  
    class="filter__input visually-hidden"
    name="filter"
    ${filterItem.isChecked && `checked`}
    ${filterItem.isDisabled && `disabled`}
  />
  <label for="filter__${filterItem.name}" class="filter__label">
    ${filterItem.name} <span class="filter__${filterItem.name}-count">${filterItem.count}</span></label
  >
`;

/**
 * Gets filter template
 * @param {Object} filterData
 * @return {string}
 */
const getFilterTemplate = (filterData) => `
  <section class="main__filter filter container">
    ${Object.keys(filterData).map((el) => getFilterItemTemplate(filterData[el])).join(``)}
  </section>
`;

/**
 * Gets search and filter template
 * @param {Object} filterData
 * @return {string}
 */
const getSearchAndFilterTemplate = (filterData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getSearchTemplate());
  joinedTemplate.push(getFilterTemplate(filterData));
  return joinedTemplate.join(``);
};

const filter = {
  all: {
    name: `all`,
    count: 13,
    isChecked: true,
    isDisabled: false
  },
  overdue: {
    name: `overdue`,
    count: 0,
    isChecked: false,
    isDisabled: true
  },
  today: {
    name: `today`,
    count: 0,
    isChecked: false,
    isDisabled: true
  },
  favorites: {
    name: `favorites`,
    count: 1,
    isChecked: false,
    isDisabled: false
  },
  repeating: {
    name: `repeating`,
    count: 1,
    isChecked: false,
    isDisabled: false
  },
  tags: {
    name: `tags`,
    count: 1,
    isChecked: false,
    isDisabled: false
  },
  archive: {
    name: `archive`,
    count: 115,
    isChecked: false,
    isDisabled: false
  }
};

export {getSearchAndFilterTemplate, filter};
