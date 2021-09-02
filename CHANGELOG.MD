# Changelog

## 9/2/2021

- Clear counter before starting new one
- Modified count animation in attempt to reduce bug where count drops below zero randomly
- Better code documentation
- Open sourced the project! See [https://github.com/realandrew/btc-live-wallpaper](https://github.com/realandrew/btc-live-wallpaper).

## 8/19/2021.3

- Fixed a bug resulting in duplicated network requests. Network traffic should now be halved (and this possibly fixes a bug).

## 8/19/2021.2

- Implemented toastify.js for non-distracting debug/error notifications, rather than using alert() which is distracting and is usually hidden behind all your windows.

## 8/19/2021.1

- Fixed bug where background wasn't changing colors.
- Disabled refresh bar by default
- Added some debug alerts to try to narrow down bug where price drops to negative infinity.

## 8/13/2021.5

- Fixed the refresh bar enabled property not working.
- Switching one property now stops reloading of other properties (i.e. now the background doesn't switch when flipping the refresh enabled property).

## 8/13/2021.4

- Refresh bar to show when next price refresh is (a little bit glitchy on higher refresh intervals, this is being looked into).
- Fixed bug where wallpaper engine properties sometimes weren't applied.

## 8/13/2021.3

- Switched from deprecated CoinDesk API to the CoinGecko API (removed decimal places as well since CoinGecko returns an integer).
    This is in preparation for future features, which require more data that CoinDesk's API didn't return.
- Added a simple dark mode option (might be improved/expanded in the future).

## 8/13/2021.2

- Added text shadow.
- Added a wallpaper engine property for price refresh interval.

## 8/13/2021

- Fixed price being interpreted as an integer, causing decimal to always end in .00.

## 8/12/2021.3

- Added background transitions. The background will transition between gradiants every 60 seconds.
    Currently there are only 4 gradients, but more will be added in the future.
- Possibly fixed bug where upon resumption of playing wallpaper the counter would go crazy.

## 8/12/2021.2

- Updated font.
- Adjusted footer css to make sure CoinDesk link is white whether visited or not.

## 8/12/2021

- Initial release.
