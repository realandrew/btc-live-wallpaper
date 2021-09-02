/* Copyright 2021 Andrew Mitchell */

/* Settings */
const switchTime = 60000; // Time between transitions in milliseconds

// Instance variables
let opacity = 0; // Since CSS doesn't support transitions, we actually just have 2 gradients that we transition the opacity of.
let switchInterval; // Interval instance used for switching between gradients.

// Array of gradients we can switch the background to
const gradients = [
    { gradient: "linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)", fallback: "hsla(333, 100%, 53%, 1)" },
    { gradient: "linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)", fallback: "hsla(217, 100%, 50%, 1)" },
    { gradient: "linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)", fallback: "hsla(33, 100%, 53%, 1)"},
    { gradient: "linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)", fallback: "hsla(152, 100%, 50%, 1)"}
];

// A custom event we call when a wallpaper engine property is changed.
window.addEventListener('weLoaded', (evt) => {
    if ((evt.detail.darkMode != evt.detail.previousProperties.darkMode) || !evt.detail.hasLoaded) // Only run if the darkmode value had changed
    {
        if (evt.detail.darkMode) { // Toggle on dark mode
            clearInterval(switchInterval);
            document.body.style.background = "#000";
            document.body.style.setProperty('--background-fallback', "#000");
            document.body.style.setProperty('--background-gradient', "#000");
            document.body.style.setProperty('--before-fallback', "#000");
            document.body.style.setProperty('--before-gradient', "#000");
        } else { // Toggle off dark mode
            clearInterval(switchInterval);
            SwitchToNewGradient();
            switchInterval = setInterval(() => {
                SwitchToNewGradient();
            }, switchTime);
        }
    }
});

/**
 * Transitions the background to a new gradient
 */
function SwitchToNewGradient() {
    // Pick a new gradient to switch to
    let index = RandomArrayIndex(gradients.length);
    let gradientObj = gradients[index];

    // We have 2 gradients we switch between. Since CSS doesn't support gradient transitions we just transition the opacity for a similar effect.
    opacity = opacity == 1 ? 0 : 1;
    if (opacity) { // Update the first gradient
        document.body.style.setProperty('--before-fallback', gradientObj.fallback);
        document.body.style.setProperty('--before-gradient', gradientObj.gradient);
    } else { // Update the other gradient
        document.body.style.setProperty('--background-fallback', gradientObj.fallback);
        document.body.style.setProperty('--background-gradient', gradientObj.gradient);
    }
    document.body.style.setProperty('--before-opacity', opacity); // Toggle opacity, causing the transition.
}

/**
 * Returns a random index for an array of a specified length.
 * @param {Number} length Length of the array.
 * @returns {Number} Random index.
 */
// Math.random give random between [0 - 1), exclusive of 1. This is multiplied by length to get a random between (0 - length). Then floored to give (0 - (length - 1)).
function RandomArrayIndex(length) {
    return Math.floor(Math.random() * length);
}