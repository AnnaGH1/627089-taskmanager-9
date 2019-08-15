import {getCardControlTemplate, cardControls} from './card-control.js';

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
 * Gets task template
 * @param {Array} tasks
 * @return {string}
 */
const getTasksTemplate = (tasks) => tasks.map(getTaskTemplate).join(``);


export {getTasksTemplate};
