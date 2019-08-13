'use strict';

/**
 * @function getMenuItemTemplate
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

const getDaysTemplate = (day) => `
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

const getCardControlTemplate = (cardControl) => `
  <button
    type="button"
    class="card__btn card__btn--${cardControl.name} ${cardControl.isDisabled && `card__btn--disabled`}"
  >
    ${cardControl.name}
  </button>
`;

const getSortFilterTemplate = (type) => `<a href="#" class="board__filter">SORT BY ${type}</a>`;

const getStatusBtnsTemplate = (btn) => `<button class="card__${btn.name}" type="${btn.type}">${btn.name}</button>`;

const getHashtagTemplate = (hashtag) => `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${hashtag}
    </span>
  </span>
`;

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

const getMenuTemplate = (menuData) => `
  <section class="control__btn-wrap">
    ${Object.keys(menuData).map((el) => getMenuItemTemplate(menuData[el])).join(``)}
  </section>
`;

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

const getFilterTemplate = (filterData) => `
  <section class="main__filter filter container">
    ${Object.keys(filterData).map((el) => getFilterItemTemplate(filterData[el])).join(``)}
  </section>
`;

const getSearchAndFilterTemplate = (filterData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getSearchTemplate());
  joinedTemplate.push(getFilterTemplate(filterData));
  return joinedTemplate.join(``);
};

const getFilterListTemplate = () => `
  <div class="board__filter-list">
      ${sortType.map((el) => getSortFilterTemplate(el[name])).join(``)}
  </div>
`;

const getTaskEditTemplate = () => `
<article class="card card--edit card--black">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
        ${cardControlsEdit.map(getCardControlTemplate).join(``)}
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
                ${days.map(getDaysTemplate).join(``)}
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
            ${colors.map(getColorTemplate).join(``)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
        ${statusBtns.map(getStatusBtnsTemplate).join(``)}
        </div>
      </div>
    </form>
  </article>
`;

const getLoadTemplate = () => `<button class="load-more" type="button">load more</button>`;

const getTasksTemplate = (tasksData) => tasksData.map(getTaskTemplate).join(``);

const getTaskEditAndTasksTemplate = (tasksData) => {
  const joinedTemplate = [];
  joinedTemplate.push(getTaskEditTemplate());
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

const renderBoardContainer = () => {
  boardContainer.classList.add(`board`, `container`);
  mainContainer.appendChild(boardContainer);
  return boardContainer;
};

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
    href: ``
  },
  {
    name: `DATE up`,
    href: ``
  },
  {
    name: `DATE down`,
    href: ``
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
renderComponent(renderBoardContainer(), getFilterListTemplate());
renderComponent(renderTasksContainer(), getTaskEditAndTasksTemplate(tasks));
renderComponent(boardContainer, getLoadTemplate());
