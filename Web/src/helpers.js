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
	setTimeSoFar: function(timeGap = defaultOptions.timeGap){
		if(!timeGap || Number(timeGap) === 0 || typeof timeGap !== 'number')
			return false;
		if(!window.timeSoFar) window.timeSoFar = timeGap;
		else window.timeSoFar += timeGap;

		return window.timeSoFar;
	},
	toggleTimeInterval: function(timeGap = defaultOptions.timeGap){
		if(window.timePadTimer)
			setInterval(this.setTimeSoFar(timeGap), timeGap);
		else window.timePadTimer = clearInterval(window.timePadTimer);
	},
	startRecording: function(){

	},
	stopRecording: function(){

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
	resetRecording: () => {
		// Resets the entire window.timePadRecording array.
		window.timePadRecording = null;
		return window.timePadRecording;
	}
};

module.exports = helpers;
