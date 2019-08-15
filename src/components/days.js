/**
 * Gets day template
 * @param {Object} day
 * @return {string}
 */
const getDayTemplate = (day) => `
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day.name}-1"
    name="repeat"
    value="${day.name}"
    ${day.isChecked && `checked`}
  />
  <label class="card__repeat-day" for="repeat-${day.name}-1"
    >${day.name}</label
  >
`;


export {getDayTemplate};
