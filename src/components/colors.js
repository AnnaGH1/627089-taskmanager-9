import {taskEditMode} from "./tasks-all.js";

/**
 * Checks if the current color is the color of the task in edit mode
 * @param {string} color
 * @param {string} currentTaskColor
 * @return {string}
 */
const checkTaskColor = (color, currentTaskColor) => color === currentTaskColor ? `checked` : ``;

/**
 * Gets color template
 * @param {string} color
 * @return {string}
 */
const getColorTemplate = (color) => `                                
  <input
    type="radio"
    id="color-${color}-1"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${checkTaskColor(color, taskEditMode.color)}
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}</label
  >
`;

export {getColorTemplate};
