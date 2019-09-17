/**
 * Gets menu item template
 * @param {Object} menuItem
 * @return {string}
 */
const getMenuItemTemplate = (menuItem) => `
  <input
    type="radio"
    name="control"
    id="control__${menuItem.csstext}"
    class="control__input visually-hidden"
    ${menuItem.isChecked && `checked`}
  />
  <label for="control__${menuItem.csstext}" class="control__label ${(menuItem.csstext === `new-task`) ? `control__label--new-task` : ``}">${menuItem.name.toUpperCase()}</label>
`;

/**
 * Gets menu template
 * @param {Object} menuData
 * @return {string}
 */
export const getMenuTemplate = (menuData) => `
  <section class="control__btn-wrap">
    ${Object.keys(menuData).map((el) => getMenuItemTemplate(menuData[el])).join(``)}
  </section>
`;

export const controlContainer = document.querySelector(`.control`);
export const mainMenu = {
  newTask: {
    name: `+ add new task`,
    csstext: `new-task`,
    isChecked: false
  },
  tasks: {
    name: `tasks`,
    csstext: `task`,
    isChecked: false
  },
  statistics: {
    name: `statistics`,
    csstext: `statistic`,
    isChecked: true
  }
};
