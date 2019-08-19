import {getCardControlTemplate} from './card-control.js';
import {cardControlsViewMode} from './data.js';

/**
 * Gets tag template
 * @param {string} tag
 * @return {string}
 */
const getTagTemplate = (tag) => `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>
`;

/**
 * Gets task template
 * @param {Object} task
 * @return {string}
 */
const getTaskTemplate = ({text, dueDate, repeatingDays, tags, color}) => `
  <article class="card card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
        ${cardControlsViewMode.map(getCardControlTemplate).join(``)}
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${text}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${new Date(dueDate).toDateString()}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${Array.from(tags).map(getTagTemplate).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
`;

/**
 * Gets task template
 * @param {Array.<Object>} tasksData
 * @return {string}
 */
const getTasksTemplate = (tasksData) => tasksData.map(getTaskTemplate).join(``);


export {getTasksTemplate};
