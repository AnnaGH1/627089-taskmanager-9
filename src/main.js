'use strict';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

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
const main = document.querySelector(`.main`);
const control = document.querySelector(`.control`);

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
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
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
const menu = `<section class="control__btn-wrap">
          <input
              type="radio"
              name="control"
              id="control__new-task"
              class="control__input visually-hidden"
            />
            <label for="control__new-task" class="control__label control__label--new-task"
              >+ ADD NEW TASK</label
            >
            <input
              type="radio"
              name="control"
              id="control__task"
              class="control__input visually-hidden"
              checked
            />
            <label for="control__task" class="control__label">TASKS</label>
            <input
              type="radio"
              name="control"
              id="control__statistic"
              class="control__input visually-hidden"
            />
            <label for="control__statistic" class="control__label"
              >STATISTICS</label
            >
          </section>`;

const search = `
          <section class="main__search search container">
              <input
                type="text"
                id="search__input"
                class="search__input"
                placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
              />
              <label class="visually-hidden" for="search__input">Search</label>
          </section>`;

const filter = `<section class="main__filter filter container">
                          <input
                            type="radio"
                            id="filter__all"
                            class="filter__input visually-hidden"
                            name="filter"
                            checked
                          />
                          <label for="filter__all" class="filter__label">
                            All <span class="filter__all-count">13</span></label
                          >
                          <input
                            type="radio"
                            id="filter__overdue"
                            class="filter__input visually-hidden"
                            name="filter"
                            disabled
                          />
                          <label for="filter__overdue" class="filter__label"
                          >Overdue <span class="filter__overdue-count">0</span></label>
                          <input
                            type="radio"
                            id="filter__today"
                            class="filter__input visually-hidden"
                            name="filter"
                            disabled
                          />
                          <label for="filter__today" class="filter__label"
                            >Today <span class="filter__today-count">0</span></label>
                          <input
                            type="radio"
                            id="filter__favorites"
                            class="filter__input visually-hidden"
                            name="filter"
                          />
                          <label for="filter__favorites" class="filter__label"
                            >Favorites <span class="filter__favorites-count">1</span></label
                          >
                          <input
                            type="radio"
                            id="filter__repeating"
                            class="filter__input visually-hidden"
                            name="filter"
                          />
                          <label for="filter__repeating" class="filter__label"
                            >Repeating <span class="filter__repeating-count">1</span></label
                          >
                          <input
                            type="radio"
                            id="filter__tags"
                            class="filter__input visually-hidden"
                            name="filter"
                          />
                          <label for="filter__tags" class="filter__label"
                            >Tags <span class="filter__tags-count">1</span></label
                          >
                          <input
                            type="radio"
                            id="filter__archive"
                            class="filter__input visually-hidden"
                            name="filter"
                          />
                          <label for="filter__archive" class="filter__label"
                            >Archive <span class="filter__archive-count">115</span></label
                          >
          </section>`;

const filterList = `<div class="board__filter-list">
            <a href="#" class="board__filter">SORT BY DEFAULT</a>
            <a href="#" class="board__filter">SORT BY DATE up</a>
            <a href="#" class="board__filter">SORT BY DATE down</a>
          </div>`;

const taskEdit = `<article class="card card--edit card--black">
                      <form class="card__form" method="get">
                        <div class="card__inner">
                          <div class="card__control">
                            <button type="button" class="card__btn card__btn--archive">
                              archive
                            </button>
                            <button
                              type="button"
                              class="card__btn card__btn--favorites card__btn--disabled"
                            >
                              favorites
                            </button>
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
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-mo-1"
                                      name="repeat"
                                      value="mo"
                                    />
                                    <label class="card__repeat-day" for="repeat-mo-1"
                                      >mo</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-tu-1"
                                      name="repeat"
                                      value="tu"
                                      checked
                                    />
                                    <label class="card__repeat-day" for="repeat-tu-1"
                                      >tu</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-we-1"
                                      name="repeat"
                                      value="we"
                                    />
                                    <label class="card__repeat-day" for="repeat-we-1"
                                      >we</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-th-1"
                                      name="repeat"
                                      value="th"
                                    />
                                    <label class="card__repeat-day" for="repeat-th-1"
                                      >th</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-fr-1"
                                      name="repeat"
                                      value="fr"
                                      checked
                                    />
                                    <label class="card__repeat-day" for="repeat-fr-1"
                                      >fr</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      name="repeat"
                                      value="sa"
                                      id="repeat-sa-1"
                                    />
                                    <label class="card__repeat-day" for="repeat-sa-1"
                                      >sa</label
                                    >
                                    <input
                                      class="visually-hidden card__repeat-day-input"
                                      type="checkbox"
                                      id="repeat-su-1"
                                      name="repeat"
                                      value="su"
                                      checked
                                    />
                                    <label class="card__repeat-day" for="repeat-su-1"
                                      >su</label
                                    >
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
                            <button class="card__save" type="submit">save</button>
                            <button class="card__delete" type="button">delete</button>
                          </div>
                        </div>
                      </form>
                    </article>`;

const loadMore = `<button class="load-more" type="button">load more</button>`;

/**
 * Renders component inside container
 * @param {HTMLElement} container
 * @param {string} component
 */
function renderComponent(container, component) {
  container.insertAdjacentHTML(`beforeend`, component);
}

renderComponent(control, menu);
renderComponent(main, search);
renderComponent(main, filter);

// create board container
const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);
main.appendChild(boardContainer);

renderComponent(boardContainer, filterList);

// create tasks container
const tasksContainer = document.createElement(`div`);
tasksContainer.classList.add(`board__tasks`);
boardContainer.appendChild(tasksContainer);

renderComponent(tasksContainer, taskEdit);
TASKS.forEach((el) => renderComponent(tasksContainer, getTaskTemplate(el)));
renderComponent(boardContainer, loadMore);


