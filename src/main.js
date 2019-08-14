'use strict';

/**
 * Gets menu item template
 * @param {Object} menuItem
 * @return {string}
 */
const getMenuItemTemplate = (menuItem) => `
  <input
    type="radio"
    name="control"
    id="control__${menuItem.csstext}"
    class="control__input visually-hidden"
    ${menuItem.isChecked && `checked`}
  />
  <label for="control__${menuItem.csstext}" class="control__label ${(menuItem.csstext === `new-task`) ? `control__label--new-task` : ``}">${menuItem.name.toUpperCase()}</label>
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
 * Gets color template
 * @param {string} color
 * @return {string}
 */
const getColorTemplate = (color) => `                                
  <input
    type="radio"
    id="color-${color}-1"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    checked
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}</label
  >
`;

/**
 * Gets day template
 * @param {string} day
 * @return {string}
 */
const getDayTemplate = (day) => `
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day.name}-1"
    name="repeat"
    value="${day.name}"
    ${day.isChecked && `checked`}
  />
  <label class="card__repeat-day" for="repeat-${day.name}-1"
    >${day.name}</label
  >
`;

/**
 * Gets card control template
 * @param {Object} cardControl
 * @return {string}
 */
const getCardControlTemplate = (cardControl) => `
  <button
    type="button"
    class="card__btn card__btn--${cardControl.name} ${cardControl.isDisabled && `card__btn--disabled`}"
  >
    ${cardControl.name}
  </button>
`;

/**
 * Gets sort filter template
 * @param {Object} filter
 * @return {string}
 */
const getSortFilterTemplate = (filter) => `<a href="${filter.href}" class="board__filter">SORT BY ${filter.name}</a>`;

/**
 * Gets status buttons template
 * @param {Object} btn
 * @return {string}
 */
const getStatusBtnsTemplate = (btn) => `<button class="card__${btn.name}" type="${btn.type}">${btn.name}</button>`;

/**
 * Gets hashtag template
 * @param {string} hashtag
 * @return {string}
 */
const getHashtagTemplate = (hashtag) => `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${hashtag}
    </span>
  </span>
`;

/**
 * Gets task template
 * @param {Object} task
 * @return {string}
 */
const getTaskTemplate = (task) => `
  <article class="card card--${task.color}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
        ${cardControls.map(getCardControlTemplate).join(``)}
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${task.text}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${task.date}</span>
                  <span class="card__time">${task.time}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${task.hashtag.map(getHashtagTemplate).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
`;

/**
 * Gets menu template
 * @param {Object} menuData
 * @return {string}
 */
const getMenuTemplate = (menuData) => `
  <section class="control__btn-wrap">
    ${Object.keys(menuData).map((el) => getMenuItemTemplate(menuData[el])).join(``)}
  </section>
`;

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

/**
 * Gets task edit template
 * @param {Array} controlsData
 * @param {Array} daysData
 * @param {Array} colorsData
 * @param {Array} statusData
 * @return {string}
 */
const getTaskEditTemplate = (controlsData, daysData, colorsData, statusData) => `
<article class="card card--edit card--black">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
        ${controlsData.map(getCardControlTemplate).join(``)}
        </div>

        <div class="card__color-bar">
          <svg width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >This is example of new task, you can add picture, set date and time, add tags.</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" disabled>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days" disabled>
                <div class="card__repeat-days-inner">
                ${daysData.map(getDayTemplate).join(``)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list"></div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
            ${colorsData.map(getColorTemplate).join(``)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
        ${statusData.map(getStatusBtnsTemplate).join(``)}
        </div>
      </div>
    </form>
  </article>
`;

/**
 * Gets load template
 * @return {string}
 */
const getLoadTemplate = () => `<button class="load-more" type="button">load more</button>`;

/**
 * Gets task template
 * @param {Array} tasksData
 * @return {string}
 */
const getTasksTemplate = (tasksData) => tasksData.map(getTaskTemplate).join(``);

/**
 * Gets task edit and tasks template
 * @param {Array} controlsData
 * @param {Array} daysData
 * @param {Array} colorsData
 * @param {Array} statusData
 * @param {Array} tasksData
 * @return {string}
 */
const getTaskEditAndTasksTemplate = (controlsData, daysData, colorsData, statusData, tasksData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate(controlsData, daysData, colorsData, statusData));
  joinedTemplate.push(getTasksTemplate(tasksData));
  return joinedTemplate.join(``);
};

/**
 * Renders component inside container
 * @param {Element} container
 * @param {string} component
 * @param {string} position for component
 * @return {Element}
 */
const renderComponent = (container, component, position = `beforeend`) => container.insertAdjacentHTML(position, component);

/**
 * Renders board container
 * @return {HTMLElement}
 */
const renderBoardContainer = () => {
  boardContainer.classList.add(`board`, `container`);
  mainContainer.appendChild(boardContainer);
  return boardContainer;
};

/**
 * Renders tasks container
 * @return {HTMLDivElement}
 */
const renderTasksContainer = () => {
  tasksContainer.classList.add(`board__tasks`);
  boardContainer.appendChild(tasksContainer);
  return tasksContainer;
};

const mainMenu = {
  newTask: {
    name: `+ add new task`,
    csstext: `new-task`,
    isChecked: false
  },
  tasks: {
    name: `tasks`,
    csstext: `task`,
    isChecked: false
  },
  statistics: {
    name: `statistics`,
    csstext: `statistic`,
    isChecked: true
  }
};
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
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
const cardControls = [
  {
    name: `edit`,
    isDisabled: false
  },
  {
    name: `archive`,
    isDisabled: false
  },
  {
    name: `favorites`,
    isDisabled: true
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
const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.control`);
const boardContainer = document.createElement(`section`);
const tasksContainer = document.createElement(`div`);

renderComponent(controlContainer, getMenuTemplate(mainMenu));
renderComponent(mainContainer, getSearchAndFilterTemplate(filter));
renderComponent(renderBoardContainer(), getFilterListTemplate(sortType));
renderComponent(renderTasksContainer(), getTaskEditAndTasksTemplate(cardControlsEdit, days, colors, statusBtns, tasks));
renderComponent(boardContainer, getLoadTemplate());
