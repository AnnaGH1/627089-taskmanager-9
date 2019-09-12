import {COLORS} from './data.js';
import AbstractComponent from "./abstract-component";

class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();
    this._text = task.text;
    this._dueDate = new Date(task.dueDate);
    this._tags = task.tags;
    this._repeatingDays = task.repeatingDays;
    this._color = task.color;
    this._isFavorites = task.isFavorites;
    this._isArchive = task.isArchive;
  }

  /**
   * Gets day template
   * @param {string} key
   * @param {boolean} value
   * @return {string}
   */
  static getDayTemplate([key, value]) {
    return `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${key}-1"
      name="repeat"
      value="${key}"
      ${value ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${key}-1"
      >${key}</label
    >`;
  }

  getDaysTemplate() {
    return Object.entries(this._repeatingDays).map(TaskEdit.getDayTemplate).join(``);
  }

  /**
   * Gets tag template
   * @param {string} tag
   * @return {string}
   */
  static getTagTemplate(tag) {
    return `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`;
  }

  getTagsTemplate() {
    return [...this._tags].map(TaskEdit.getTagTemplate).join(``);
  }

  /**
   * Gets color template
   * @param {string} color
   * @return {string}
   */
  getColorTemplate(color) {
    return `<input
    type="radio"
    id="color-${color}-1"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${color === this._color ? `checked` : ``}
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}</label
  >`;
  }

  getColorsTemplate() {
    return COLORS.map(this.getColorTemplate.bind(this)).join(``);
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${Object.values(this._repeatingDays).some((isRepeating) => isRepeating) ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button
              type="button"
              class="card__btn card__btn--archive"
              ${this._isArchive ? `disabled` : ``}
            >
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites"
              ${this._isFavorites ? `disabled` : ``}
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
              >${this._text}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      value="${this._dueDate ? new Date(this._dueDate).toDateString() : ``}"
                    />
                  </label>
                </fieldset>
  
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${Object.values(this._repeatingDays).some((isRepeating) => isRepeating) ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__repeat-days" ${Object.values(this._repeatingDays).some((isRepeating) => isRepeating) ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                  ${this.getDaysTemplate()}
                  </div>
                </fieldset>
              </div>
  
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this.getTagsTemplate()}
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
              ${this.getColorsTemplate()}
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
  }
}

export {TaskEdit as default};
