/**
 * Gets random elements from array
 * @param {Array} arr
 * @param {number} limit
 * @return {Array}
 */
const getRandEls = (arr, limit) => {
  const selection = [];
  for (let i = 0; i < limit; i++) {
    selection.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return selection;
};

export {getRandEls};
