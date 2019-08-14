/**
 * Gets status buttons template
 * @param {Object} btn
 * @return {string}
 */
const getStatusBtnsTemplate = (btn) => `<button class="card__${btn.name}" type="${btn.type}">${btn.name}</button>`;


export {getStatusBtnsTemplate};
