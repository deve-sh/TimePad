// Tests corresponding to the main functionality of TimePad.

const TimePad = require("../src/index");
const mockElement = require("./__mockups__/mockElement");

it("should return null when no node and option is passed.", () => {
	expect(TimePad()).toBe(null);
});

it("testing options for TimePad.", () => {
	expect(TimePad(mockElement("textarea"), null)).toBe(null);
	expect(TimePad(mockElement("TextArea"), 50)).toBe(null);
	expect(TimePad(mockElement("input"), { timeGap: 60 })).not.toBe(null);
});
