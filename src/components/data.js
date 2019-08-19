/**
 * Gets random task
 * @return {{
 * repeatingDays: {tu: *, mo: *, su: boolean, th: *, fr: boolean, we: *, sa: boolean},
 * color: *,
 * dueDate: number,
 * text: *,
 * tags: *
 * }}
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
      'mo': Boolean(Math.round(Math.random())),
      'tu': Boolean(Math.round(Math.random())),
      'we': Boolean(Math.round(Math.random())),
      'th': Boolean(Math.round(Math.random())),
      'fr': false,
      'sa': false,
      'su': false,
    },
    color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
  }
);

export {getTask};
