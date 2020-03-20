const fetchRecordingSoFar = () => {
	// Function returns the array of recorded keystrokes and clicks so far.
	if (window.timePadRecording) return window.timePadRecording;
	else return [];
};

const setRecordingSoFar = newItem => {
	if (!newItem) return false;
	else if (!window.timePadRecording) window.timePadRecording = [newItem];
	else
		return (window.timePadRecording = [
			...window.timePadRecording,
			newItem
		]);
};

const generateTimePadItem = (time, value, cursor, selection) => {
	// Function to generate new timePadRecording item.
	// The generated Item will be appended/pushed to the window.timePadRecording array.
	if (!time) time = 0;

	let id =
		window.timePadRecording && Array.isArray(window.timePadRecording)
			? window.timePadRecording[window.timePadRecording.length - 1].id
			: 1;

	let newItem = {
		id,
		time,
		value,
		cursor,
		selection
	};
	return newItem;
};

const resetRecording = () => {
	// Resets the entire window.timePadRecording array.
	return (window.timePadRecording = null);
};
