let currentTime = 0,
	currentReplayTime = 0,
	minimumGap = 50, // Have a minimum gap of 'n' milliseconds between records.
	timer = null,
	textArea = null,
	replayTextArea = null,
	finalArray = [],
	isRecording = false,
	isReplaying = false;

/*
const payLoadFormat = {
	time: 0,
	text : "",
	selection: null,
	cursor: 0
}
*/

function initTimer(elementToTrack = "", trackerFunction = () => null) {
	if (elementToTrack && trackerFunction && !isRecording) {
		// All arguments passed and there is no recording already going on.
		let element = document.querySelector(elementToTrack);
		if (element) {
			// Adding event listeners to the text area.
			element.addEventListener("keyup", trackerFunction); // Add an event listener for keystrokes.
			element.value = "";		// Reset values.
			textArea = element;

			// Setting time and the timer.
			currentTime = 0;
			currentReplayTime = 0; // The next time the replay starts from the beginning.
			isRecording = !isRecording;
			finalArray = [];
			timer = setInterval(() => (currentTime += minimumGap), minimumGap);
		}
	}
	return false;
}

function pauseTimer(trackerFunction) {
	if (textArea && isRecording) {
		textArea.removeEventListener("keyup", trackerFunction); // Remove the event listener.
		isRecording = !isRecording;
		return clearInterval(timer);
	}
}

function resumeTimer(trackerFunction) {
	if (textArea && !isRecording) {
		textArea.value = finalArray[finalArray.length - 1].text;
		textArea.addEventListener("keyup", trackerFunction);
		isRecording = !isRecording;
		return (timer = setInterval(
			() => (currentTime += minimumGap),
			minimumGap
		));
	}
}

function stopTimer(trackerFunction) {
	if (textArea && isRecording) {
		textArea.removeEventListener("keyup", trackerFunction, false);
		textArea = null;
		isRecording = !isRecording;
		currentTime = 0;
		clearInterval(timer);
	}
}

/*
	Replay Controls
*/

function replayChanges(replayerTextArea = "", replayerFunction = () => {}) {
	// Function to replay changes on another text box, or the same textbox.
	if (
		replayerTextArea &&
		!isReplaying &&
		!replayTextArea &&
		finalArray.length > 0
	) {
		let element = document.querySelector(replayerTextArea);

		if (element) {
			replayTextArea = element;
			currentReplayTime = 0;
			isReplaying = !isReplaying;
			timer = setInterval(() => {
				currentReplayTime += minimumGap;
				replayerFunction(replayTextArea);
			}, minimumGap);
		}
	}
}

function pauseReplay(){
	if(isReplaying && replayTextArea){
		clearInterval(timer);
		isReplaying = !isReplaying;
	}
}

function resumeReplay(replayerFunction){
	if(!isReplaying && replayTextArea){
		isReplaying = !isReplaying;
		timer = setInterval(() => {
			currentReplayTime += minimumGap;
			replayerFunction(replayTextArea);
		}, minimumGap);
	}
}

function stopReplay() {
	if (isReplaying && replayTextArea) {
		clearInterval(timer);
		currentReplayTime = 0;
		isReplaying = !isReplaying;
		replayTextArea = null;
	}
}
