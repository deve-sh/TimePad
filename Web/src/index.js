/*
	A flexible text box with the capability to remember everything that you do inside it.
	Including keystrokes, selections and cursors.
*/

const {
	verifyNode,
	fetchRecordingSoFar,
	setRecordingSoFar,
	generateTimePadItem,
	resetRecording,
	getCursor,
	getSelection,
	toggleTimeInterval,
	toggleEventListeners,
	injectControls,
	keyEventListener,
	clickEventListener
} = require("./helpers");

const defaultOptions = require("./defaultOptions");

function TimePad(
	node,
	options = defaultOptions,
	afterRecordingCallback = recording => recording
) {
	/*
		Underlying algorithm : 
		1. Get the node to track.
		2. Add an event listener to that node if is a textarea or editable field.
	*/
	if (
		node &&
		typeof options === "object" &&
		options !== null &&
		typeof afterRecordingCallback === "function"
	) {
		let timePadNode = node;
		let optionsForNode = {
			...defaultOptions,
			...options
		};

		if (verifyNode(timePadNode)) {
			// contentEditable not exactly supported right now, since the value of the input/textarea is used instead of innerHTML.

			// Function to increment the value of the current time in window object.
			toggleTimeInterval(optionsForNode.timeGap);

			// Uncomment the following commented code blocks to enable experimental click events as well.
			// const cursorEventListener = (event) => {
			// 	let eventNode = timePadNode;
			// }
			// timePadNode.addEventListener("click", clickEventListener);

			if (optionsForNode.showController) {
				// Injecting the controls for the textbox.
				injectControls(timePadNode, optionsForNode.controllerClass);
			}

			// Creating a controller for the recording.

			return true;
		} else return null;
	} else return null;
}

module.exports = TimePad;
