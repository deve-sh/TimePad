function trackChange() {
	if (textArea) {
		let text = textArea.value;
		let selection = getSelection(textArea);

		if (selection[0] === selection[1]) selection = null;

		let cursor = getCursorPosition(textArea);

		let payLoad = {
			time: currentTime,
			text,
			selection,
			cursor
		};

		finalArray.push(payLoad);
	}
}

function applyChanges(replayTextarea) {
	// Function to make changes to the text of the textarea while replaying.
	if (replayTextarea && isReplaying) {
		replayTextarea.focus();

		let timeRecord = searchForTime(currentReplayTime);
		if (timeRecord === -2) {
			// The recording has ended.
			stopReplay();
		} else if (timeRecord === -1) {
			// Time not found.
			return;
		} else {
			replayTextarea.value = timeRecord.text;
			if (timeRecord.selection && Array.isArray(timeRecord.selection)) {
				// If there was a selection in the text.
				setSelectionRange(
					replayTextarea,
					timeRecord.selection[0],
					timeRecord.selection[1]
				);
			}
			else
				setCaretToPos(replayTextarea, timeRecord.cursor);
			return;
		}
	}
}
