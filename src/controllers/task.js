import {Key, Position, render, unrender} from '../components/utils';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class TaskController {
  constructor(container, data, onDataChange, onViewChange) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);
    this._colorClass = `card--${this._data.color}`;
    this._create();
  }

  _subscribeOnTaskEditEvents() {
    // Closes edit mode on Esc keydown
    const onEscKeyDown = (e) => {
      if (e.key === Key.ESCAPE_IE || e.key === Key.ESCAPE) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    // Open edit mode
    this._taskView.getElement()
      .addEventListener(`click`, ((e) => {
        if (e.target.classList.contains(`card__btn--edit`)) {
          e.preventDefault();
          // Close previous cards in edit mode
          this._onViewChange();
          // Open a new card in edit mode
          this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
          document.addEventListener(`keydown`, onEscKeyDown);
        }
      }));

    // Prevent close edit mode on Esc keydown when card is being edited
    this._taskEdit.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`focus`, (() => document.removeEventListener(`keydown`, onEscKeyDown)));

    // Allow close edit mode on Esc keydown when card is not edited
    this._taskEdit.getElement()
      .querySelector(`.card__text`)
      .addEventListener(`blur`, (() => document.addEventListener(`keydown`, onEscKeyDown)));

    // Close edit mode and save
    this._taskEdit.getElement()
      .addEventListener(`click`, ((e) => {
        if (e.target.classList.contains(`card__save`)) {
          e.preventDefault();
          const isArchive = this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`);
          const isFavorites = this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`);
          const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
          const entry = {
            text: formData.get(`text`),
            color: formData.get(`color`),
            tags: new Set(formData.getAll(`hashtag`)),
            dueDate: new Date(formData.get(`date`)),
            repeatingDays: formData.getAll(`repeat`)
              .reduce((acc, it) => {
                acc[it] = true;
                return acc;
              }, {
                'mo': false,
                'tu': false,
                'we': false,
                'th': false,
                'fr': false,
                'sa': false,
                'su': false,
              }),
            isArchive,
            isFavorites,
          };
          this._onDataChange(entry, this._data);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }));
  }

  _subscribeOnControlsEvents() {
    // Add to or remove from archive/favorites
    this._taskEdit.getElement()
      .addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`card__btn--archive`)) {
          e.target.classList.toggle(`card__btn--disabled`);
        } else if (e.target.classList.contains(`card__btn--favorites`)) {
          e.target.classList.toggle(`card__btn--disabled`);
        }
      });
  }

  _subscribeOnDateEvents() {
    // Toggle date
    this._taskEdit.getElement().addEventListener(`click`, this._onDateButtonClick);
  }

  _subscribeOnRepeatingDaysEvents() {
    this._taskEdit.getElement()
      .addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`card__repeat-toggle`)) {
          this._onRepeatButtonClick(e);
        }
      });

    this._taskEdit.getElement()
      .addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`card__repeat-day`)) {
          this._onDayClick(e);
        }
      });
  }

  _subscribeOnTagEvents() {
    // Add new tag
    this._taskEdit.getElement()
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`keydown`, (e) => {
        if (e.key === Key.ENTER) {
          e.preventDefault();
          this._taskEdit.getElement()
            .querySelector(`.card__hashtag-list`)
            .insertAdjacentHTML(Position.BEFOREEND, TaskEdit.getTagTemplate(e.target.value));
          e.target.value = ``;
        }
      });

    // Remove tag
    this._taskEdit.getElement()
      .addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`card__hashtag-delete`)) {
          unrender(e.target.parentElement);
        }
      });
  }

  _subscribeOnColorEvents() {
    this._taskEdit.getElement()
      .addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`card__color`)) {
          const colorClassNew = `card--${e.target.previousElementSibling.value}`;
          this._taskEdit.getElement()
            .classList.replace(this._colorClass, colorClassNew);
          this._colorClass = colorClassNew;
        }
      });
  }

  _create() {
    const flatpickrConfig = {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.dueDate,
    };
    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), flatpickrConfig);

    this._subscribeOnControlsEvents();
    this._subscribeOnDateEvents();
    this._subscribeOnRepeatingDaysEvents();
    this._subscribeOnTagEvents();
    this._subscribeOnColorEvents();
    this._subscribeOnTaskEditEvents();
    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  _onDateButtonClick(e) {
    if (e.target.classList.contains(`card__date-deadline-toggle`)) {
      // Toggle date fieldset
      e.target.nextElementSibling.toggleAttribute(`disabled`);

      // Toggle status text
      e.target.firstElementChild.textContent = e.target.firstElementChild.textContent === `yes` ? `no` : `yes`;
    }
  }

  _onRepeatButtonClick(e) {
    e.preventDefault();
    // Toggle repeat fieldset
    e.target.nextElementSibling.toggleAttribute(`disabled`);

    // Toggle wave
    this._taskEdit.getElement()
      .classList.toggle(`card--repeat`);

    // Clear repeating days if disabled
    if (e.target.nextElementSibling.hasAttribute(`disabled`)) {
      e.target.nextElementSibling.querySelectorAll(`.card__repeat-day-input`)
        .forEach((el) => el.removeAttribute(`checked`));
    }

    // Toggle status text
    e.target.firstElementChild.textContent = e.target.firstElementChild.textContent === `yes` ? `no` : `yes`;
  }

  _onDayClick(e) {
    e.preventDefault();
    e.target.previousElementSibling.toggleAttribute(`checked`);
  }
}
