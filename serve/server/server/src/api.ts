module.exports = (a: number, b: number): number => {
  if (process.env) {
    return a + b;
  }
  return a - b;
}