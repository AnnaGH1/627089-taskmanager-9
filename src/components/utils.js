const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

/**
 * Gets random elements from array
 * @param {Array} arr
 * @param {number} count
 * @return {Array}
 */
const getRandEls = (arr, count) => {
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
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Renders element
 * @param {Element} container
 * @param {Element} element
 * @param {string} place
 */
const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * Unrenders element
 * @param {Element} element
 */
const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {getRandEls, createElement, render, unrender, Position};

