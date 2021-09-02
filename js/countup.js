/* Count-up animation adapted from https://jshakespeare.com/simple-count-up-number-animation-javascript-react/ */

const animationDuration = 2000; // How long you want the animation to take, in ms
const frameDuration = 1000 / 60; // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const totalFrames = Math.round(animationDuration / frameDuration); // Use that to calculate how many frames we need to complete the animation
const easeOutQuad = t => t * (2 - t); // An ease-out function that slows the count as it progresses

let counter; // Interval instance
let frame = 0; // Current animation frame
let countFrom; // Number to start count animation from
let countTo; // Number to end count animation at

/**
 * Animates a number element
 * @param {*} el - The element containing the numbers to animate the change of.
 * @param {number} oldNumber The current value of the number.
 * @param {number} newNumber The value to change the number to.
 * @param {number} decimalPlaces The amount of decimal places to display.
 * @returns 
 */
const animateCount = (el, oldNumber, newNumber, decimalPlaces = 0) => {
	if (oldNumber == newNumber) { return };
	countFrom = parseFloat(oldNumber, 10);
	countTo = parseFloat(newNumber, 10);
	if (frame == 0) {
		let currentCount = countFrom;
		// Start the animation running 60 times per second
		clearInterval(counter);
		counter = setInterval(() => {
			frame++;
			// Calculate our progress as a value between 0 and 1
			// Pass that value to our easing function to get our
			// progress on a curve
			const progress = easeOutQuad(frame / totalFrames);
			// Use the progress value to calculate the current count
			currentCount = Number(countFrom + ((countTo - countFrom) * progress)).toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	
			// If the current count has changed, update the element
			if (parseInt(el.innerHTML, 10) !== currentCount) {
				el.innerHTML = currentCount;
			}
	
			// If we’ve reached our last frame, stop the animation
			if (frame >= totalFrames) {
				clearInterval(counter);
				frame = 0;
			}
		}, frameDuration);
	}
};