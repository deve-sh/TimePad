const helpers = {
	fetchRecordingSoFar: () => {
		// Function returns the array of recorded keystrokes and clicks so far.
		if (window.timePadRecording) return window.timePadRecording;
		else return [];
	},
	setRecordingSoFar: newItem => {
		if (!newItem) return window.timePadRecording ? window.timePadRecording : false;
		else if (!window.timePadRecording) window.timePadRecording = [newItem];
		else window.timePadRecording = [...window.timePadRecording, newItem];

		return window.timePadRecording;
	},
	generateTimePadItem: (time, value, cursor, selection) => {
		// Function to generate new timePadRecording item.
		// The generated Item will be appended/pushed to the window.timePadRecording array.
		if (!time) time = 0;

		let id =
			window.timePadRecording && Array.isArray(window.timePadRecording)
				? window.timePadRecording[window.timePadRecording.length - 1].id + 1
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
	resetRecording: () => {
		// Resets the entire window.timePadRecording array.
		window.timePadRecording = null;
		return window.timePadRecording;
	}
};

module.exports = helpers;
