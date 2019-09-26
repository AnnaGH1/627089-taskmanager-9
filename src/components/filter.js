import AbstractComponent from "./abstract-component";

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
      ${this._filter.map(Filter._getFilterTemplate).join(``)}
      </section>`;
  }

  static _getFilterTemplate(filter) {
    return `<input
    type="radio"
    id="filter__${filter.title}"  
    class="filter__input visually-hidden"
    name="filter"
    ${filter.isChecked && `checked`}
    ${filter.isDisabled && `disabled`}
  />
    <label for="filter__${filter.title}" class="filter__label">
      ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label
    >`;
  }
}
