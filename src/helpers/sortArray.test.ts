import { sortArray } from "./sortArray";

test("It must return a different array than the one entered.", () => {
  const arr = [1, 2, 3, 4, 5];
  const sortedArr = sortArray<number>(arr);

  expect(arr).not.toEqual(sortedArr);
});
