const api = require('../src/api');

test('sum(2 + 2) 等于 4', () => {
  expect(api(2, 2)).toBe(4);
})