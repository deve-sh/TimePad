const {
	fetchRecordingSoFar,
	setRecordingSoFar,
	generateTimePadItem,
	resetRecording
} = require("../helpers");

test("fetchRecordingSoFar should return an empty array in the absense of the window object.", () => {
	expect(JSON.stringify(fetchRecordingSoFar())).toBe("[]");
});

test("setRecordingSoFar should work well.", () => {
	expect(setRecordingSoFar()).toBe(false);
	expect(setRecordingSoFar({ id: 1 })).toStrictEqual([{ id: 1 }]);
	expect(setRecordingSoFar({ id: 2 })).toStrictEqual([{ id: 1 }, { id: 2 }]); // One from the previous setting as well.
	expect(setRecordingSoFar()).toStrictEqual([{ id: 1 }, { id: 2 }]);
});

test("testing generateTimePadItem", () => {
	expect(generateTimePadItem()).toStrictEqual({
		id: 3,
		time: 0,
		value: undefined,
		cursor: undefined,
		selection: undefined
	});

	let recordingsAfterAdding = setRecordingSoFar(generateTimePadItem());

	expect(recordingsAfterAdding.length).toBe(3); // We have added 3 pieces of recording already.
});

test("testing resetRecording and functionality after that.", () => {
	expect(resetRecording()).toBe(null);
	let itemToAdd = generateTimePadItem(1000, "Hey", 2, [1, 2]);
	expect(itemToAdd).toStrictEqual({
		id: 1,
		time: 1000,
		value: "Hey",
		cursor: 2,
		selection: [1, 2]
	});

	expect(setRecordingSoFar(itemToAdd)).toStrictEqual([itemToAdd]);
});
