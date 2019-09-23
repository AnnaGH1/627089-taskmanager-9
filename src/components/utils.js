export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};
export const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
  ENTER: `Enter`,
};

/**
 * Capitalizes the first letter of a string
 * @param {string} string
 * @return {string}
 */
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Prepends element to container
 * @param {Element} container
 * @param {Element} element
 * @return {*|void}
 */
const prepend = (container, element) => container.prepend(element);

/**
 * Appends element to container
 * @param {Element} container
 * @param {Element} element
 * @return {*|void}
 */
const append = (container, element) => container.append(element);

const renderMap = {
  [Position.AFTERBEGIN]: prepend,
  [Position.BEFOREEND]: append,
};

/**
 * Gets random elements from array
 * @param {Array} arr
 * @param {number} count
 * @return {Array}
 */
export const getRandEls = (arr, count) => {
  const selection = [];
  while (selection.length < count) {
    selection.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return selection;
};


/**
 * Creates Element
 * @param {string} template
 * @return {ChildNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Renders element
 * @param {Element} container
 * @param {ChildNode} element
 * @param {string} place
 * @return {*|void}
 */
export const render = (container, element, place) => renderMap[place](container, element);

/**
 * Unrenders element
 * @param {Element} element
 * @return {Element}
 */
export const unrender = (element) => element ? element.remove() : element;

