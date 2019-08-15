import {boardContainer} from './board-container.js';

/**
 * Renders tasks container
 * @return {HTMLDivElement}
 */
const renderTasksContainer = () => {
  tasksContainer.classList.add(`board__tasks`);
  boardContainer.appendChild(tasksContainer);
  return tasksContainer;
};

const tasksContainer = document.createElement(`div`);

export {renderTasksContainer};
