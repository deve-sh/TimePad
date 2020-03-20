/*
	A flexible text box with the capability to remember everything that you do inside it.
	Including keystrokes, selections and cursors.
*/

const TimePad = node => {
	/*
		Underlying algorithm : 
		1. Get the node to track.
		2. Add an event listener to that node if is a textarea or editable field.
	*/
	if (node) {
		let timePadNode = node;
		if (
			timePadNode.tagName === "textarea".toUpperCase() ||
			timePadNode.tagName === "input".toUpperCase()
		) {
			// contentEditable not exactly supported right now, since the value of the input/textarea is used instead of innerHTML.

			// The event listeners to listen to the keystrokes and the clicks on the textarea/inputs.

			const eventListener = (event) => {
				let eventNode = timePadNode;


			};

			// Uncomment the following commented code blocks to enable experimental click events as well.
			// const cursorEventListener = (event) => {
			// 	let eventNode = timePadNode;
			// }

			timePadNode.addEventListener("keyup", eventListener);
			// timePadNode.addEventListener("click", eventListener);

			return true;
		}
		else return null;
	} else return null;
};

exports.TimePad = TimePad;
