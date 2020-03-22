// Tests corresponding to the main functionality of TimePad.

const { TimePad } = require("../src/index");

it("should return null when no node and option is passed.", () => {
	expect(TimePad()).toBe(null);
});

let mockElement = tagName => {
	return {
		tagName: tagName.toUpperCase(),
		addEventListener: () => {}
	};
};

it("show return null when a non-editable node is passed (Not a textarea or an input field)", () => {
	expect(TimePad(mockElement("textarea"))).not.toBe(null);
	expect(TimePad(mockElement("TextArea"))).not.toBe(null);
	expect(TimePad(mockElement("input"))).not.toBe(null);
	expect(TimePad(mockElement("inPut"))).not.toBe(null);
	expect(TimePad(mockElement("div"))).toBe(null);
});

it("testing options for TimePad.", () => {
	expect(TimePad(mockElement("textarea"), null)).toBe(null);
	expect(TimePad(mockElement("TextArea"), 50)).toBe(null);
	expect(TimePad(mockElement("input"), { timeGap: 60 })).not.toBe(null);
});
