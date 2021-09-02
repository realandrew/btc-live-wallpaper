/* Copyright 2021 Andrew Mitchell */

// Configurable properties
let refreshInterval = 5; // How often to refresh (in seconds). Set from wallpaper engine settings
let darkMode = false; // Whether to use a black background instead of the animated color gradients. Set from wallpaper engine settings.

// Instance globals
let previousProperties = { refreshInterval: refreshInterval, darkMode: darkMode }; // Stores previous settings so that changes can be detected.
let hasLoaded = false; // Whether wallpaper engine property hooks have been loaded.
let lastPrice = 0.0; // The last price of Bitcoin
let refreshTimeout; // Stores the timeout instead until the next refresh.
let _btcusd; // The html element containing the USD price of Bitcoin.

// Check if running within wallpaper engine, if not then set hasLoaded to true
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.refreshinterval) { // Get the refreshInterval setting and apply it
            refreshInterval = properties.refreshinterval.value;
            StartBTCInterval(i = 0, ((refreshInterval * 1000) / 100));
        }
        if (properties.darkmode) { // Get the dark mode setting and apply it
            darkMode = properties.darkmode.value;
        }
        // A custom event is dispatched to let our our scripts know a wallpaper engine property was changed.
        const evt = new CustomEvent('weLoaded', { detail: { hasLoaded: hasLoaded, refreshInterval: refreshInterval, darkMode: darkMode, previousProperties: previousProperties }});
        window.dispatchEvent(evt);
        previousProperties = { refreshInterval: refreshInterval, darkMode: darkMode }; // Update the previous properties to the new properties.
        hasLoaded = true; // We have now loaded
    },
};

// Start the counter once the window has loaded
window.addEventListener('load', async (event) => {
    _btcusd = document.getElementById("usd"); // Set the counter element
    RefreshBTC(); // This runs the price check of bitcoin once to get us our initial price
    StartBTCInterval(i = 0, ((refreshInterval * 1000) / 100)); // And here we start the interval that checks every x seconds based on the refreshInterval property.
});

// 
/**
 * This runs the price check interval, we actually use a timeout so that we can dynamically update if the refreshInterval property changes.
 * Works by recursively calling itself using a timeout of ()
 * @param {number} index Current index of the timeout loop
 * @param {number} iterations Number of iterations of the timeout loop
 * @returns The timeout interval instance, so it can be cleared before starting a new interval.
 */
async function StartBTCInterval(index, iterations) {
    clearTimeout(refreshInterval); // Stop the current timeout if it exists
    // Start a new timeout loop
    refreshInterval = setTimeout(function () {
        index++;
        if (index >= iterations) {
            RefreshBTC();
            index = 0;
        }
        refreshTimeout = StartBTCInterval(index, ((refreshInterval * 1000) / 100));
    }, 100);
    return refreshInterval;
}

/**
 * Refreshs the current BTC price.
 */
async function RefreshBTC() {
    try {
        let priceUSD = await GetCurrentBTCPrice("usd"); // Fetchs the current BTC price in USD
        DisplayBTCPrice(priceUSD); // Display the updated price
    } catch (err) {
        // Display a toast message notifying user of the error
        Toastify({
            text: "[Error] Failed to fetch price! " + err.message,
            duration: 5000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            offset: {
                x: 30,
                y: 50
            },
        }).showToast();
    }
}

/**
 * Updates the displayed BTC price to the once specified.
 * @param {number} btcUSD 
 */
function DisplayBTCPrice(btcUSD) {
    animateCount(_btcusd, lastPrice, btcUSD); // Runs the animation effect to update to the new price.
    lastPrice = btcUSD; // Update the last price to be the new one, used for the animated effect starting count.
}

/**
 * Fetchs the current BTC price in the specified currency.
 * @param {string} currency The currency to used when fetching the price of a BTC-Currency pair. (ISO 4217 I believe, if not check the CoinGecko documentation).
 * @returns {number} BTC-Currency price.
 */
async function GetCurrentBTCPrice(currency) {
    return new Promise((resolve, reject) => {
        if (String(currency).toLowerCase() == "usd") {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
            .then((resp) => {
                if (resp.status != 200) {
                    reject(new Error("Error fetching price! Status: " + resp.status));
                } else {
                    return resp;
                }
            })
            .then(resp => resp.json())
            .then(data => {
                resolve(data[0].current_price);
            }).catch(err => {
                reject(err);
            });
        } else {
            reject(new Error("Invalid value for currency parameter!"));
        }
    });
}

/* Utility functions */
/**
 * Allows us to "sleep" by returning after the specified milliseconds.
 * @param {number} ms Milliseconds to sleep for.
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}