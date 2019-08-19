import {getDayTemplate} from './days.js';
import {getColorTemplate} from './colors.js';
import {getStatusBtnsTemplate} from './status-btns.js';

/**
 * Gets task edit template
 * @param {Array} days
 * @param {Array} colors
 * @param {Array} statusBtns
 * @return {string}
 */
const getTaskEditTemplate = (days, colors, statusBtns) => `
<article class="card card--edit card--black">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button
            type="button"
            class="card__btn card__btn--archive"
          >
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites"
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
            ></textarea>
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
                ${days.map(getDayTemplate).join(``)}
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

export {getTaskEditTemplate};
