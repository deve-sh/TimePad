const {
	fetchRecordingSoFar,
	setRecordingSoFar,
	generateTimePadItem,
	resetRecording,
	setTimeSoFar,
	toggleRecording,
	stopRecording
} = require("../src/helpers");

const defaultOptions = require("../src/defaultOptions");

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
	let itemToAdd = generateTimePadItem("Hey", 2, [1, 2]);

	expect(itemToAdd).toStrictEqual({
		id: 1,
		time: 0,
		value: "Hey",
		cursor: 2,
		selection: [1, 2]
	});

	expect(setRecordingSoFar(itemToAdd)).toStrictEqual([itemToAdd]);
});

test("testing setTimeSoFar", () => {
	expect(setTimeSoFar()).toBe(defaultOptions.timeGap);
	expect(setTimeSoFar(null)).toBe(false);
});

test("testing toggleRecording and stopRecording", () => {
	expect(toggleRecording()).toBe(true);
	expect(toggleRecording()).toBe(false);
	expect(stopRecording()).toBe(false);
	toggleRecording();
	expect(stopRecording(recording => recording)).toStrictEqual([
		{
			id: 1,
			time: 0,
			value: "Hey",
			cursor: 2,
			selection: [1, 2]
		}
	]); // One from the previous test.
});
