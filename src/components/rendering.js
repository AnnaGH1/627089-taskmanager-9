/**
 * Renders component inside container
 * @param {Element} container
 * @param {string} component
 * @param {string} position for component
 * @return {Element}
 */
export const renderComponent = (container, component, position = `beforeend`) => container.insertAdjacentHTML(position, component);
