'use strict';

const MENU_ITEMS = [
  {
    name: `tasks`,
    csstext: `task`,
    checked: true
  },
  {
    name: `statistics`,
    csstext: `statistic`,
    checked: false
  },
];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const DAYS = [
  {
    name: `mo`,
    checked: false
  },
  {
    name: `tu`,
    checked: true
  },
  {
    name: `we`,
    checked: true
  },
  {
    name: `th`,
    checked: false
  },
  {
    name: `fr`,
    checked: false
  },
  {
    name: `sa`,
    checked: true
  },
  {
    name: `su`,
    checked: false
  }
];
const STATUS_BTNS = [
  {
    name: `save`,
    type: `submit`
  },
  {
    name: `delete`,
    type: `button`
  }
];
const CARD_CONTROLS_EDIT = [
  {
    name: `archive`,
    disabled: false
  },
  {
    name: `favorites`,
    disabled: false
  }
];
const FILTER = [
  {
    name: `all`,
    count: 13,
    checked: true,
    disabled: false
  },
  {
    name: `overdue`,
    count: 0,
    checked: false,
    disabled: true
  },
  {
    name: `today`,
    count: 0,
    checked: false,
    disabled: true
  },
  {
    name: `favorites`,
    count: 1,
    checked: false,
    disabled: false
  },
  {
    name: `repeating`,
    count: 1,
    checked: false,
    disabled: false
  },
  {
    name: `tags`,
    count: 1,
    checked: false,
    disabled: false
  },
  {
    name: `archive`,
    count: 115,
    checked: false,
    disabled: false
  },
];
const SORT_TYPE = [`DEFAULT`, `DATE up`, `DATE down`];
const CARD_CONTROLS = [
  {
    name: `edit`,
    disabled: false
  },
  {
    name: `archive`,
    disabled: false
  },
  {
    name: `favorites`,
    disabled: true
  }
];
const TASKS = [
  {
    text: `Example default task with ${COLORS[0]} color.`,
    color: `${COLORS[0]}`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtag: [`personal`, `important`]
  },
  {
    text: `Example default task with ${COLORS[1]} color.`,
    color: `${COLORS[1]}`,
    date: `24 September`,
    time: `11:30 PM`,
    hashtag: [`todo`, `personal`, `important`]
  },
  {
    text: `Example default task with ${COLORS[4]} color.`,
    color: `${COLORS[4]}`,
    date: `25 September`,
    time: `11:50 PM`,
    hashtag: [`todo`, `important`]
  }
];

// containers
const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.control`);

const getMenuTemplate = (menuItem) => {
  if (menuItem.checked) {
    return `
      <input
        type="radio"
        name="control"
        id="control__${menuItem.csstext}"
        class="control__input visually-hidden"
        checked
      />
      <label for="control__${menuItem.csstext}" class="control__label">${menuItem.name.toUpperCase()}</label>
    `;
  } else {
    return `
      <input
        type="radio"
        name="control"
        id="control__${menuItem.csstext}"
        class="control__input visually-hidden"
      />
      <label for="control__${menuItem.csstext}" class="control__label">${menuItem.name.toUpperCase()}</label>
    `;
  }
};

const getFilterTemplate = (filter) => {
  if (filter.checked) {
    return `
    <input
      type="radio"
      id="filter__${filter.name}"  
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${filter.name}" class="filter__label">
      ${filter.name} <span class="filter__${filter.name}-count">${filter.count}</span></label
    >`;
  } else if (filter.disabled) {
    return `
        <input
      type="radio"
      id="filter__${filter.name}"  
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__${filter.name}" class="filter__label">
      ${filter.name} <span class="filter__${filter.name}-count">${filter.count}</span></label
    >
    `;
  } else {
    return `
        <input
      type="radio"
      id="filter__${filter.name}"  
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__${filter.name}" class="filter__label">
      ${filter.name} <span class="filter__${filter.name}-count">${filter.count}</span></label
    >
    `;
  }
};

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

const getDaysTemplate = (day) => {
  if (day.checked) {
    return `
          <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day.name}-1"
        name="repeat"
        value="${day.name}"
        checked
      />
      <label class="card__repeat-day" for="repeat-${day.name}-1"
        >${day.name}</label
      >`;
  } else {
    return `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day.name}-1"
        name="repeat"
        value="${day.name}"
      />
      <label class="card__repeat-day" for="repeat-${day.name}-1"
        >${day.name}</label
      >`;
  }
};

const getCardControlTemplate = (cardControl) => {
  if (cardControl.disabled) {
    return `
          <button
            type="button"
            class="card__btn card__btn--${cardControl.name} card__btn--disabled"
          >
            ${cardControl.name}
          </button>
  `;
  } else {
    return `
          <button
            type="button"
            class="card__btn card__btn--${cardControl.name}"
          >
            ${cardControl.name}
          </button>
`;
  }
};

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
        ${CARD_CONTROLS.map(getCardControlTemplate).join(``)}
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

// components markup
const menuTemplate = `
  <section class="control__btn-wrap">
    <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >+ ADD NEW TASK</label
      >
      ${MENU_ITEMS.map(getMenuTemplate).join(``)}
  </section>
`;

const searchTemplate = `
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

const filterTemplate = `
  <section class="main__filter filter container">
    ${FILTER.map(getFilterTemplate).join(``)}
  </section>
`;

const filterListTemplate = `
  <div class="board__filter-list">
      ${SORT_TYPE.map(getSortFilterTemplate).join(``)}
  </div>
`;

const taskEditTemplate = `<article class="card card--edit card--black">
                      <form class="card__form" method="get">
                        <div class="card__inner">
                          <div class="card__control">
                          ${CARD_CONTROLS_EDIT.map(getCardControlTemplate).join(``)}
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
                                  ${DAYS.map(getDaysTemplate).join(``)}
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
                              ${COLORS.map(getColorTemplate).join(``)}
                              </div>
                            </div>
                          </div>

                          <div class="card__status-btns">
                          ${STATUS_BTNS.map(getStatusBtnsTemplate).join(``)}
                          </div>
                        </div>
                      </form>
                    </article>`;

const loadMoreTemplate = `<button class="load-more" type="button">load more</button>`;

/**
 * Renders component inside container
 * @param {Element} container
 * @param {string} component
 */
function renderComponent(container, component) {
  container.insertAdjacentHTML(`beforeend`, component);
}

renderComponent(controlContainer, menuTemplate);
renderComponent(mainContainer, searchTemplate);
renderComponent(mainContainer, filterTemplate);

// create board container
const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);
mainContainer.appendChild(boardContainer);

renderComponent(boardContainer, filterListTemplate);

// create tasks container
const tasksContainer = document.createElement(`div`);
tasksContainer.classList.add(`board__tasks`);
boardContainer.appendChild(tasksContainer);

renderComponent(tasksContainer, taskEditTemplate);
TASKS.forEach((el) => renderComponent(tasksContainer, getTaskTemplate(el)));
renderComponent(boardContainer, loadMoreTemplate);


