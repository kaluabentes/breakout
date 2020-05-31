export default function sumArraysLength(array) {
  return array.reduce((prev, curr) => {
    return prev + curr.length;
  }, 0);
}
