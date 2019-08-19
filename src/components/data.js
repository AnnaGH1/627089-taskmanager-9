/**
 * Gets random task
 * @return {{repeatingDays: {}, color: *, dueDate: number, text: *, tags: *}}
 */
const getTask = () => (
  {
    text: [
      `Prepare for the pitch`,
      `Find money for travel`,
      `Eat something`,
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    tags: new Set([`personal`, `important`]),
    repeatingDays: {
      [days[0]]: Boolean(Math.round(Math.random())),
      [days[1]]: Boolean(Math.round(Math.random())),
      [days[2]]: Boolean(Math.round(Math.random())),
      [days[3]]: Boolean(Math.round(Math.random())),
      [days[4]]: false,
      [days[5]]: false,
      [days[6]]: false,
    },
    color: colors[Math.floor(Math.random() * 5)],
  }
);

const TASKS_COUNT = 5;
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const cardControlsViewMode = [
  {
    name: `edit`,
    isDisabled: false
  },
  {
    name: `archive`,
    isDisabled: false
  },
  {
    name: `favorites`,
    isDisabled: true
  }
];
const cardControlsEditMode = [
  {
    name: `archive`,
    isDisabled: false
  },
  {
    name: `favorites`,
    isDisabled: false
  }
];
const statusBtns = [
  {
    name: `save`,
    type: `submit`
  },
  {
    name: `delete`,
    type: `button`
  }
];
const tasks = new Array(TASKS_COUNT).fill({}).map(getTask);

export {days, colors, cardControlsViewMode, cardControlsEditMode, statusBtns, tasks};
