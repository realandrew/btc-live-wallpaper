# Bitcoin Live Price Wallpaper

## What is it?

This project is an HTML5 based web app that displays the current price of Bitcoin, updated every 5 seconds (configurable).
This is meant to be run as a wallpaper, using [Wallpaper Engine](https://www.wallpaperengine.io/), but can also be used standalone in the browser (the difference being that if you want to change the configurable properties, you'll have to manually edit them at the top of main.js since Wallpaper Engine provides a GUI with event hooks for property changes).

Anyone who has wallpaper engine and wants to use it can find it on the Steam Workshop [here](https://steamcommunity.com/sharedfiles/filedetails/?id=2573360835).

## How it works

This works by fetching the current Bitcoin-USD price pair from CoinGecko every {refreshInterval} seconds. It then changes the displayed price to the newly fetched one, using an animation when doing so as this is a wallpaper.

## Roadmap

Note the wallpaper is currently very minimal. I want to maintain the minimal look, but add more features that can be toggled on via properties.
My first plan is to add support for other fiat currencies, likely via a configurable property specifying the currency ISO code. I will publish a more detailed roadmap soon.

## Contributing

This is a standard HTML5 stack project, so anyone who knows HTML, CSS, and JavaScript should be able to make contributions.
I plan to make a more detailed CONTRIBUTING.md in the future, but for the now the following guidelines apply:

* Problems should be reported via GitHub issues
* Features and changes may be discussed via GitHub issues
* Small features that can be toggled on and off via properties with no effects on other features can be submitted via pull request.
* Larger features or major changes to existing features should be discussed via a GitHub issue first.
* Quality of life improvements to existing code and/or documentation is very welcome and can be submitted via pull request.
* Please make your pull request against the development branch. This branch gets merged into master when doing a release for Wallpaper Engine (Steam Workshop).

All of the project code is documented and should be self-explanatory (if it's not feel free to open an issue). For Wallpaper Engine related things, see their [documentation](https://docs.wallpaperengine.io/en/web/overview.html).

If you like to test this project in Wallpaper Engine, you can place it in C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\projects\myprojects or the equivalent on your system, open Wallpaper Engine, go to the bottom, click open wallpaper, and then open offline wallpaper (animated), and select the project.json file that's in this repo. This is only necessary when modifying wallpaper-specific code (such as configurable properties), otherwise debugging in the web browser is sufficient.

Releases onto Steam Workshop for Wallpaper Engine users is done manually by Andrew Mitchell, as this is hard to automate and releases will likely roll up multiple new commits rather than a new release per commit approach.

## License

This project and any assets contributed to it, are licensed under the MIT license. See LICENSE.md for details.
