// Tests corresponding to the main functionality of TimePad.

const { TimePad } = require("../index");

it("should return null when no node is passed.", () => {
	expect(TimePad()).toBe(null);
});

it("show return null when a non-editable node is passed (Not a textarea or an input field)", () => {
	let mockElement = tagName => {
		return {
			tagName: tagName.toUpperCase(),
			addEventListener: () => {}
		};
	};

	expect(TimePad(mockElement("textarea"))).not.toBe(null);
	expect(TimePad(mockElement("TextArea"))).not.toBe(null);
	expect(TimePad(mockElement("input"))).not.toBe(null);
	expect(TimePad(mockElement("inPut"))).not.toBe(null);
	expect(TimePad(mockElement("div"))).toBe(null);
});
