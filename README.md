<a href="https://flotiq.com/">
    <img src="https://editor.flotiq.com/fonts/fq-logo.svg" alt="Flotiq logo" title="Flotiq" align="right" height="60" />
</a>

Flotiq Mobile Expo
========================

This is a mobile demo project for browsing Flotiq entries. It is configured to pull all data from your [Flotiq](https://flotiq.com) account.

You can use this React Native project to kickstart your next mobile app development.

Install the app from Apple App Store or Google Play, use the QR code in your API keys to connect the app to Flotiq and browse through your content.

[![Flotiq Mobile Expo on Apple App Store](https://user-images.githubusercontent.com/551004/29770691-a2082ff4-8bc6-11e7-89a6-964cd405ea8e.png)](https://apps.apple.com/app/flotiq-mobile-expo/id1505331246) [![Flotiq Mobile Expo on Google Play](https://user-images.githubusercontent.com/551004/29770692-a20975c6-8bc6-11e7-8ab0-1cde275496e0.png)](https://play.google.com/store/apps/details?id=com.flotiqmobiledemo)

This project was generated using [Expo](https://expo.io) version 4.5.1 with [React Native](https://reactnative.dev/) SDK version 41.0.0 and [React](https://reactjs.org/) version 16.13.1 and was tested for Android 10 and 11.

Screenshots:
<p float="left">
<img src="https://api.flotiq.com/image/225x400/_media-312eac73-40fa-49e8-899d-dad955dcce5c.png">
<img src="https://api.flotiq.com/image/225x400/_media-e14b4826-377b-4c71-a922-3b4ed95a0dc6.png">
<img src="https://api.flotiq.com/image/225x400/_media-f082f83a-10b3-4271-80b7-90fb641f2ece.png">
<img src="https://api.flotiq.com/image/225x400/_media-6ce3b769-d819-44ad-b653-dd5d3e7380f8.png">
</p>

## Key features:

* Login via API Key
* API Key QR code scanner
* Listing Content Type Definitions
* Listing Content Objects
* Single Content Object preview
* Content Object management (create, update, delete)


## Quick start

We assume you have [nodejs](https://nodejs.org/en/download/) installed.

1. **Clone project**

    ```bash
   git clone https://github.com/flotiq/flotiq-mobile-demo 
   ```

2. **Install expo**

    ```bash
   yarn global add expo-cli 
   ```

3. **Start developing**

    ```bash
   cd flotiq-mobile-demo/
   yarn install
   yarn start
    ```

This will start Metro server and open browser tab on which you can start the app on Android and iOS* simulator or on the real device** reading the QR code.

*iOS simulators can be only installed on macOS.

**The real device have to have Expo Go app installed ([Android app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US), [iOS app](https://apps.apple.com/us/app/expo-go/id982107779)).

## Simulators

We recommend installing Android Studio through the excellent [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/) on Windows/Linux/macOS to run Android simulator; and [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) for iOS simulator.

Turn on the simulator:
- Android - follow [documentation](https://developer.android.com/studio/debug/dev-options) for instructions,
- iOS - follow [documentation](https://developer.apple.com/documentation/xcode/running_your_app_in_the_simulator_or_on_a_device) for instructions.

## Collaborating

If you wish to talk with us about this project, feel free to hop on our [![Discord Chat](https://img.shields.io/discord/682699728454025410.svg)](https://discord.gg/FwXcHnX)

If you found a bug, please report it in [issues](https://github.com/flotiq/flotiq-mobile-demo/issues).
