import { sortArray } from "@/helpers/sortArray";

describe("sortArray", () => {
  describe("return value", () => {
    it("should return a new array reference", () => {
      const original = [1, 2, 3];
      const result = sortArray(original);
      expect(result).not.toBe(original);
    });

    it("should return an array of the same length", () => {
      const original = [1, 2, 3, 4, 5];
      expect(sortArray(original)).toHaveLength(original.length);
    });

    it("should contain all the original elements", () => {
      const original = [1, 2, 3, 4, 5];
      const result = sortArray(original);
      expect(result).toEqual(expect.arrayContaining(original));
      expect(original).toEqual(expect.arrayContaining(result));
    });

    it("should not mutate the original array", () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      sortArray(original);
      expect(original).toEqual(copy);
    });
  });

  describe("edge cases", () => {
    it("should return an empty array when given an empty array", () => {
      expect(sortArray([])).toEqual([]);
    });

    it("should return a single-element array unchanged", () => {
      expect(sortArray([42])).toEqual([42]);
    });

    it("should work with string elements", () => {
      const original = ["a", "b", "c", "d"];
      const result = sortArray(original);
      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining(original));
    });

    it("should work with object elements", () => {
      const a = { id: 1 };
      const b = { id: 2 };
      const c = { id: 3 };
      const original = [a, b, c];
      const result = sortArray(original);
      expect(result).toHaveLength(3);
      expect(result).toContain(a);
      expect(result).toContain(b);
      expect(result).toContain(c);
    });
  });

  describe("shuffling", () => {
    it("should shuffle elements based on Math.random", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      const result = sortArray([1, 2, 3, 4]);
      expect(result).toEqual([2, 3, 4, 1]);
    });
  });
});
