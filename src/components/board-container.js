import {mainContainer} from './main-container.js';
const boardContainer = document.createElement(`section`);

/**
 * Renders board container
 * @return {HTMLElement}
 */
const renderBoardContainer = () => {
  boardContainer.classList.add(`board`, `container`);
  mainContainer.appendChild(boardContainer);
  return boardContainer;
};

export {renderBoardContainer, boardContainer};
