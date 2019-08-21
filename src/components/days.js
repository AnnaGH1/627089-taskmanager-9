/**
 * Gets day template
 * @param {string} key
 * @param {boolean} value
 * @return {string}
 */
const getDayTemplate = ([key, value]) => `
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${key}-1"
    name="repeat"
    value="${key}"
    ${value ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${key}-1"
    >${key}</label
  >
`;

export {getDayTemplate};
