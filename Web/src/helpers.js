const defaultOptions = require("./defaultOptions");

const helpers = {
	getCursor: textarea => {
		if (textarea) return textarea.selectionStart;
		else return 0;
	},
	getSelection: selection => {
		if (textarea) return [textarea.selectionStart, textarea.selectionEnd];
		else return null;
	},
	fetchRecordingSoFar: () => {
		// Function returns the array of recorded keystrokes and clicks so far.
		if (window.timePadRecording) return window.timePadRecording;
		else return [];
	},
	setRecordingSoFar: newItem => {
		if (!newItem)
			return window.timePadRecording ? window.timePadRecording : false;
		else if (!window.timePadRecording) window.timePadRecording = [newItem];
		else window.timePadRecording = [...window.timePadRecording, newItem];

		return window.timePadRecording;
	},
	setTimeSoFar: function(timeGap = defaultOptions.timeGap) {
		if (!timeGap || Number(timeGap) === 0 || typeof timeGap !== "number")
			return false;
		if (!window.timeSoFar) window.timeSoFar = timeGap;
		else window.timeSoFar += timeGap;

		return window.timeSoFar;
	},
	injectControls: (
		timePadNode = null,
		controllerClassName = defaultOptions.controllerClass,
		afterStopCallback
	) => {
		if (
			!timePadNode ||
			document.getElementById("timePadControls") ||
			typeof afterStopCallback !== "function"
		) {
			// Controls already set or no timePadNode.
			return false;
		}

		if (!controllerClassName)
			controllerClassName = defaultOptions.controllerClass;
		else if (
			controllerClassName.indexOf(defaultOptions.controllerClass) === -1
		)
			controllerClassName += defaultOptions.controllerClass;

		let baseClassName = defaultOptions.controllerClass;

		let controlHTML = `<div class='${controllerClassName}'>
			<button class='${baseClassName}-controlbutton play'>Play</button>
			<button class='${baseClassName}-controlbutton pause'>Pause</button>
			<button class='${baseClassName}-controlbutton stop'>Stop</button>
		</div>`;

		try {
			if ((timePadNode.outerHTML += controlHTML)) {
				// Now adding the event listeners to the buttons.
				if (
					document
						.querySelector(`.${baseClassName}-controlbutton.play`)
						.addEventListener("click", () =>
							helpers.toggleRecording(timePadNode)
						) &&
					document
						.querySelector(`.${baseClassName}-controlbutton.pause`)
						.addEventListener("click", () =>
							helpers.toggleRecording(timePadNode)
						) &&
					document
						.querySelector(`.${baseClassName}-controlbutton.stop`)
						.addEventListener("click", () =>
							helpers.stopRecording(afterStopCallback)
						)
				)
					return true;
				else throw Error("Could not attach event listeners to the buttons.");
			} else throw Error("Could not append controls to DOM Node.");
		} catch (err) {
			return err.toString();
		}
	},
	keyEventListener: event => {
		let eventNode = event.target;

		if (eventNode) {
			let nodeValue = eventNode.value,
				nodeCursor = getCursor(eventNode),
				nodeSelection = getSelection(eventNode);

			// Setting the recording in the window so far.
			helpers.setRecordingSoFar(
				helpers.generateTimePadItem(
					nodeValue,
					nodeCursor,
					nodeSelection
				)
			);
		} else return null;
	},
	clickEventListener: event => {
		// Coming soon, or probably never. I don't know. :P
		return null;
	},
	toggleEventListeners: function(timePadNode = null) {
		if (!timePadNode) return false;

		if (!window.timePadIsRecording)
			timePadNode.addEventListener("keypress", helpers.keyEventListener);
		else {
			// Detach if TimePad is recording right now.
			timePadNode.removeEventListener(
				"keypress",
				helpers.keyEventListener
			);
		}
	},
	toggleTimeInterval: function(stopRecording = false) {
		if (stopRecording)
			window.timePadTimer = clearInterval(window.timePadTimer);
		else {
			if (!window.timePadTimer) {
				window.timePadTimer = setInterval(
					helpers.setTimeSoFar(defaultOptions.timeGap),
					defaultOptions.timeGap
				);
			} else window.timePadTimer = clearInterval(window.timePadTimer);
		}
		return window.timePadTimer;
	},
	toggleRecording: function(timePadNode = null) {
		if (!timePadNode) return null;

		if (window.timePadIsRecording) window.timePadIsRecording = false;
		else window.timePadIsRecording = true;
		helpers.toggleTimeInterval(timeGap); // Toggle the incrementer.

		// Attach/detach the event listeners from the timeNode.
		helpers.toggleEventListeners(timePadNode);
		return window.timePadIsRecording;
	},
	generateTimePadItem: (value, cursor, selection) => {
		// Function to generate new timePadRecording item.
		// The generated Item will be appended/pushed to the window.timePadRecording array.
		let time = window.timeSoFar ? window.timeSoFar : 0,
			id =
				window.timePadRecording &&
				Array.isArray(window.timePadRecording)
					? window.timePadRecording[
							window.timePadRecording.length - 1
					  ].id + 1
					: 1;

		let newItem = {
			id,
			time,
			value,
			cursor,
			selection
		};
		return newItem;
	},
	stopRecording: (callback = recording => recording) => {
		if (!window.timePadIsRecording) return window.timePadIsRecording;

		window.timePadIsRecording = false;
		helpers.toggleTimeInterval(null, true); // Remove the timer entirely.
		return callback(window.timePadRecording); // Return the recording
	},
	resetRecording: () => {
		// Resets the entire window.timePadRecording array.
		window.timePadRecording = null;
		return window.timePadRecording;
	}
};

module.exports = helpers;
