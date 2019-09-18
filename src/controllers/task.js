import {Key, Position, render} from "../components/utils";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";

export default class TaskController {
  constructor(container, data, onDataChange, onViewChange) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);
    this.create();
  }

  create() {
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
                'su': false
              }),
          };
          this._onDataChange(entry, this._data);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }));

    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}
