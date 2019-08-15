/**
 * Gets sort filter template
 * @param {Object} filter
 * @return {string}
 */
const getSortFilterTemplate = (filter) => `<a href="${filter.href}" class="board__filter">SORT BY ${filter.name}</a>`;

/**
 * Gets filter list template
 * @param {Array} sortOptions
 * @return {string}
 */
const getFilterListTemplate = (sortOptions) => `
  <div class="board__filter-list">
      ${sortOptions.map(getSortFilterTemplate).join(``)}
  </div>
`;

const sortType = [
  {
    name: `DEFAULT`,
    href: `#`
  },
  {
    name: `DATE up`,
    href: `#`
  },
  {
    name: `DATE down`,
    href: `#`
  }
];

export {getFilterListTemplate, sortType};
