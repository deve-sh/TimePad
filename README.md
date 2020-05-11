# TimePad

TimePad is a basic recordable and replayable textarea (More of an algorithm for a recordable and replayable textarea), that can be used for all sorts of stuff such as a recordable code lecture paired with Audio guides (Used in [Hobnob](https://deve-sh.github.io/hobnob)), coding interviews or basically wherever your creativity can find a use for it.

## Implementation Example

A basic example of the implementation of Timepad is provided at [this place](https://deve-sh.github.io/TimePad), one could use the [following algorithm](#basic-algorithm-for-replication) to replicate TimePad in any environment and any language that can use something like this.

## Basic Algorithm for replication

Timepad can be replicated in the environment of your choice with the following algorithms:

#### Recording

1. Setup a `textarea` or any input equivalent that can accept text and has event handlers for `changes`, `selections` and `cursor movements` depending on your needs.

2. Set `currentTime` to `0` in the beginning.

```javascript
window.currentTime = 0;
```

3. Similarly, create an array, preferrable named `recordedChanges` that is an empty array.

```javascript
window.recordedChanges = [];
```

4. Add buttons or handlers for play, pause and terminate recording. You can even conditionally render them based on the state (For example, one might want to hide the terminate button while the textarea is recording).

5. On starting of recording, toggle a function that increases the value of `currentTime` roughly 20-30 times a second, by a margin of `1000ms/(Increments per second)` for smooth recording (20fps or 30fps or even more, but anything over 30fps is basically unnecessary).

```javascript
function incrementTime(fps) {
	if (fps && parseInt(fps)) window.currentTime += 1000 / parseInt(fps);
}

// Attaching the above function to an interval.
window.fps = 30;

window.timer = window.setInterval(function() {
	incrementTime(window.fps);
}, window.fps);

// Use the window.timer variable to clearInterval on pause and terminate.
```

6. On cursor movement (Which includes selection of text) or change in the text of the textarea, have a trigger function record the following things: **Cursor Position**, **Selection Range** and **Text Content** of the textarea, bundle them in an object and push them to `recordedChanges` array along with the time of change.

```javascript
function addTowindow.recordedChanges(text, cursor, selection){
	return window.recordedChanges.push({
		time: currentTime,	// the time that was being incremented.
		text,
		cursor,
		selection
	});
};
```

(See **`js/helpers.js`** and **`js/scripts.js`** for an example of these functions.)

7. On stop or pause, pause the incrementer function as well so the times when recording was paused are not considered.

8. Once done, use the pause/stop button to stop recording. Log the `recordedChanges` array to get the changes with time. You can store it on a server for replaying later on or export it to simply replay it later on a separate textarea using the algo in the [upcoming section](#replaying).

Optional step:

9. In the question of scale, it's already a very efficient solution since it is much smaller in comparison to video recording a textarea in the first place. However, if you are still worried. Here are some solutions:
    - Have the recording streamed instead of being thrown to the client or server all at once. Especially in case of long recordings that can have a lot of text in them.
    - Use `null` values in case there isn't a selection, instead of storing the entire selection objects.
    - Reduce the length of the keys used to store the data in the objects, for example:

```
{
	ti: currentTime,
	t: text,
	c: cursor,
	s: selection
}
```

    	As a result you would be storing a string of less length in case you decide to follow the following step.

    - You could also choose to store a Stringified version of `recordedChanges` in order to reduce the memory when stored on the server and parse it as objects once received by the frontend.

```javascript
// While storing in the backend
let dataToSend = JSON.stringify(window.recordedChanges);
// While using the same recording received from the backend.
let dataToReplay = JSON.parse(receivedStringArray);
```

#### Replaying

Once the `recordedChanges` array is received from the recorded textarea, you can replay it by following the enlisted steps.

1. Just like recording, set the `currentTime` to 0 in the beginning and add `recordedChanges` as a global variable for the timebeing.

2. Setup a textarea or another input equivalent that you can control the flow and content of using functions.

3. Add appropriate Start, Reset and Pause buttons. The start button fires the interval function that increments the `currentTime` by a certain margin and at a certain time like in step 5 of [Recording](#recording).

4. Setup a binary search function for quick finding of the time related object.

```javascript
function searchForTime(timeToSearch = 0) {
	// Function that uses binary search to search for occurances of the time in the array.
	if (
		window.recordedChanges[window.recordedChanges.length - 1].time <
		timeToSearch
	)
		return -2; // The recording has ended.

	let min = 0,
		max = window.recordedChanges.length - 1;

	while (min <= max) {
		mid = parseInt((min + max) / 2);
		if (window.recordedChanges[mid].time === timeToSearch)
			return window.recordedChanges[mid];
		else if (window.recordedChanges[mid].time > timeToSearch) max = mid - 1;
		else min = min + 1;
	}
	return -1;
}
```

5. Setup a function to apply the changes of the found object by time to the textarea. Look at an example of it in **`js/scripts.js`** (applyChanges).

6. In the function you setup as an interval function in step 3, add a code snippet that searches for the instance of `currentTime` in the `recordedChanges` array, and applies the changes if it finds one. Similarly, stop the replay if you get a `-2` return from the binary search function above.

7. On pause, clear the interval to be setup again when the user clicks play. On reset, reset the `currentTime` to 0 and clear the interval.

8. There you go, you now have a recordable and replayable textarea.

## Disclaimer

The code that is used for the implementation isn't exactly something you would put into a testing environment right on the go, it just serves as an example and can break. I would be pretty happy if you break it and let me know in the issues section of the repository.

## Building stuff with TimePad

I am pretty sure this is not the only algo like this out there, for sure. However, if you choose to use this in any of your services, projects or projects. Do let me know at [my email](mailto:devesh2027@gmail.com). I would be more than pleased to know.

## Issues and Improvements

For any issues you may face or have suggestions that might improve the algo and TimePad, just open an issue or make the changes you may want to the algo and open a pull request for the Repo, improvements deemed worthy will be merged or considered for any future changes.
