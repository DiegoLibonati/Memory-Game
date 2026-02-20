import { sortArray } from "@/helpers/sortArray";

describe("sortArray", () => {
  it("should return a new array with same length", () => {
    const original = [1, 2, 3, 4, 5];
    const sorted = sortArray(original);

    expect(sorted).toHaveLength(original.length);
  });

  it("should not modify original array", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];

    sortArray(original);

    expect(original).toEqual(copy);
  });

  it("should contain all elements from original array", () => {
    const original = [1, 2, 3, 4, 5];
    const sorted = sortArray(original);

    original.forEach((item) => {
      expect(sorted).toContain(item);
    });
  });

  it("should sort array of strings", () => {
    const original = ["a", "b", "c", "d", "e"];
    const sorted = sortArray(original);

    expect(sorted).toHaveLength(original.length);
    original.forEach((item) => {
      expect(sorted).toContain(item);
    });
  });

  it("should sort array of objects", () => {
    const original = [
      { id: "1", name: "First" },
      { id: "2", name: "Second" },
      { id: "3", name: "Third" },
    ];
    const sorted = sortArray(original);

    expect(sorted).toHaveLength(original.length);
    expect(sorted).toEqual(expect.arrayContaining(original));
  });

  it("should handle empty array", () => {
    const original: number[] = [];
    const sorted = sortArray(original);

    expect(sorted).toEqual([]);
  });

  it("should handle single element array", () => {
    const original = [1];
    const sorted = sortArray(original);

    expect(sorted).toEqual([1]);
  });

  it("should produce different order with high probability", () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sorted1 = sortArray(original);
    const sorted2 = sortArray(original);
    const sorted3 = sortArray(original);

    const allSame =
      JSON.stringify(sorted1) === JSON.stringify(sorted2) &&
      JSON.stringify(sorted2) === JSON.stringify(sorted3);

    expect(allSame).toBe(false);
  });
});
