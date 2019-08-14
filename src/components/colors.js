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
    checked
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}</label
  >
`;


export {getColorTemplate};
