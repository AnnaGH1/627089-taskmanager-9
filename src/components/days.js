/**
 * Gets day template
 * @param {Object} day
 * @return {string}
 */
const getDayTemplate = (day) => `
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-1"
    name="repeat"
    value="${day}"
  />
  <label class="card__repeat-day" for="repeat-${day}-1"
    >${day}</label
  >
`;

export {getDayTemplate};
