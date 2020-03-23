/*
	A flexible text box with the capability to remember everything that you do inside it.
	Including keystrokes, selections and cursors.
*/

const {
	fetchRecordingSoFar,
	setRecordingSoFar,
	generateTimePadItem,
	resetRecording,
	getCursor,
	getSelection,
	toggleTimeInterval,
	attachEventListeners,
	injectControls
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

		if (
			timePadNode.tagName === "textarea".toUpperCase() ||
			timePadNode.tagName === "input".toUpperCase() // Add more types here as needed.
		) {
			// contentEditable not exactly supported right now, since the value of the input/textarea is used instead of innerHTML.

			// The event listeners to listen to the keystrokes and the clicks on the textarea/inputs.

			const keyEventListener = event => {
				let eventNode = timePadNode;

				if (eventNode) {
					let nodeValue = eventNode.value,
						nodeCursor = getCursor(eventNode),
						nodeSelection = getSelection(eventNode);

					// Setting the recording in the window so far.
					setRecordingSoFar(
						generateTimePadItem(
							nodeValue,
							nodeCursor,
							nodeSelection
						)
					);
				} else return null;
			};

			// Other functionality to start, stop and pause their recordings.

			// Function to increment the value of the current time in window object.
			toggleTimeInterval(optionsForNode.timeGap);

			// Uncomment the following commented code blocks to enable experimental click events as well.
			// const cursorEventListener = (event) => {
			// 	let eventNode = timePadNode;
			// }
			// timePadNode.addEventListener("click", eventListener);

			if (optionsForNode.showController)
				injectControls(timePadNode, optionsForNode.controllerClass);
			attachEventListeners(timePadNode);

			// Creating a controller for the recording.

			return true;
		} else return null;
	} else return null;
}

module.exports = TimePad;
