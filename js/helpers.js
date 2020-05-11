// Function to set the position of cursor or a selection to a certain point in a textarea.
function setSelectionRange(textarea, selectionStart, selectionEnd) {
  if (textarea.setSelectionRange) {
    textarea.focus();
    textarea.setSelectionRange(selectionStart, selectionEnd);
  } else if (textarea.createTextRange) {
    var range = textarea.createTextRange();
    range.collapse(true);
    range.moveEnd("character", selectionEnd);
    range.moveStart("character", selectionStart);
    range.select();
  }
}

function setCaretToPos(textarea, pos) {
  setSelectionRange(textarea, pos, pos);
}

// Function to get the selection index of a textarea.

function getSelection(textarea) {
  if (textarea) return [textarea.selectionStart, textarea.selectionEnd];
  else return null;
}

function getCursorPosition(textarea) {
  if (textarea) return textarea.selectionStart;
  else return 0;
}

function searchForTime(timeToSearch = 0) {
  // Function that uses binary search to search for occurances of the time in the array.
  if (finalArray[finalArray.length - 1].time < timeToSearch) return -2; // The recording has ended.

  let min = 0,
    max = finalArray.length - 1;

  while (min <= max) {
    mid = parseInt((min + max) / 2);
    if (finalArray[mid].time === timeToSearch) return finalArray[mid];
    else if (finalArray[mid].time > timeToSearch) max = mid - 1;
    else min = min + 1;
  }
  return -1;
}

// Function to round a number to the nearest n.

function roundnum(number, nearest) {
  return Math.round(number / nearest) * nearest;
}
