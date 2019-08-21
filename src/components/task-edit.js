import {getDayTemplate} from './days.js';
import {getColorTemplate} from './colors.js';

/**
 * Checks if task is repeating
 * @param {Object} taskRepeatingDays
 * @return {boolean}
 */
const checkIfRepeating = (taskRepeatingDays) => Object.keys(taskRepeatingDays).some((day) => taskRepeatingDays[day]);

/**
 * Gets hashtag template
 * @param {string} name
 * @return {string}
 */
const getHashtagTemplate = (name) => `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${name}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>
`;

/**
 * Gets task edit template
 * @param {Array} days
 * @param {Array} colors
 * @param {Object} task
 * @return {string}
 */
const getTaskEditTemplate = (days, colors, {text, color, dueDate, repeatingDays, tags, isArchive, isFavorite}) => `
<article class="card card--edit card--${color} ${checkIfRepeating(repeatingDays) ? `card--repeat` : ``}" >
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button
            type="button"
            class="card__btn card__btn--archive"
            ${isArchive ? `disabled` : ``}
          >
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites"
            ${isFavorite ? `disabled` : ``}
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
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${text}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${dueDate ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                    value="${dueDate ? new Date(dueDate).toDateString() : ``}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${checkIfRepeating(repeatingDays) ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${checkIfRepeating(repeatingDays) ? `` : `disabled`}>
                <div class="card__repeat-days-inner">
                ${Object.entries(repeatingDays).map(getDayTemplate).join(``)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${Array.from(tags).map(getHashtagTemplate).join(``)}
              </div>

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
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>
`;

export {getTaskEditTemplate};
