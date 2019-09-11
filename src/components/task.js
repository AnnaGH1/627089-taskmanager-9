import {createElement} from './utils.js';

class Task {
  constructor(task) {
    this._text = task.text;
    this._dueDate = new Date(task.dueDate);
    this._tags = task.tags;
    this._repeatingDays = task.repeatingDays;
    this._color = task.color;
    this._isFavorites = task.isFavorites;
    this._isArchive = task.isArchive;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
    return this._element;
  }

  /**
   * Gets tag template
   * @param {string} tag
   * @return {string}
   */
  static getTagTemplate(tag) {
    return `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>`;
  }

  getTagsTemplate() {
    return [...this._tags].map(Task.getTagTemplate).join(``);
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button
              type="button"
              class="card__btn card__btn--edit"
            >
              edit
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive ${this._isArchive && `card__btn--disabled`}"
            >
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorites && `card__btn--disabled`}"
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
            <p class="card__text">${this._text}</p>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${new Date(this._dueDate).toDateString()}</span>
                  </p>
                </div>
              </div>
  
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${this.getTagsTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }
}

export {Task};
