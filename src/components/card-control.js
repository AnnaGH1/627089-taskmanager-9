/**
 * Gets card control template
 * @param {Object} cardControl
 * @return {string}
 */
const getCardControlTemplate = (cardControl) => `
  <button
    type="button"
    class="card__btn card__btn--${cardControl.name} ${cardControl.isDisabled && `card__btn--disabled`}"
  >
    ${cardControl.name}
  </button>
`;

export {getCardControlTemplate};
