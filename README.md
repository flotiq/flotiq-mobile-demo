<a href="https://flotiq.com/">
    <img src="https://editor.flotiq.com/fonts/fq-logo.svg" alt="Flotiq logo" title="Flotiq" align="right" height="60" />
</a>

Flotiq Mobile Expo
========================

You can use this React Native project to kickstart your next mobile app development. 

Install the app from Apple App Store or Google Play, use the QR code in your API keys to connect the app to Flotiq and browse through your content.

[![Flotiq Mobile Expo on Apple App Store](https://user-images.githubusercontent.com/551004/29770691-a2082ff4-8bc6-11e7-89a6-964cd405ea8e.png)](https://apps.apple.com/app/flotiq-mobile-expo/id1505331246) [![Flotiq Mobile Expo on Google Play](https://user-images.githubusercontent.com/551004/29770692-a20975c6-8bc6-11e7-8ab0-1cde275496e0.png)](https://play.google.com/store/apps/details?id=com.flotiqmobiledemo)

Screenshots:
<p float="left">
<img src="https://api.flotiq.com/image/200x400/_media-5eb4123f65c3d.png">
<img src="https://api.flotiq.com/image/200x400/_media-5eb41261030c3.png">
<img src="https://api.flotiq.com/image/200x400/_media-5eb4128924efe.png">
<img src="https://api.flotiq.com/image/200x400/_media-5eb414e34e512.png">
</p>

Then start building your own app, based on the Flotiq Mobile Expo.

## SETUP

- To prepare your development environment follow the official React Native guide. This project was created with RN CLI.
  Read more in the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup).

### Android Studio
- We recommend to install Android Studio through the excellent JetBrains Toolbox.

    `https://www.jetbrains.com/toolbox-app/`

### Xcode
- The app has been successfuly built with Xcode 11.4.

### React-Native - PROJECT
(`nodejs` is must.)

- Clone this repository
    
    `git clone https://github.com/flotiq/flotiq-mobile-demo`
    
and run:

    `npm install`

- Turn on the simulator:
   - Android - follow [documentation](https://developer.android.com/studio/debug/dev-options) for instructions, 
   - iOS - follow [documentation](https://developer.apple.com/documentation/xcode/running_your_app_in_the_simulator_or_on_a_device) for instructions.
   
- Run project:

    `npx react-native run-android`
    `npx react-native run-ios`

    Sometimes there is an issue with starting `metro` server. In separate window run it manually:

    `npx react-native run`

- You can also start the project directly from Android Studio or Xcode.

## COMMON ISSUES
- Android

    If there is an error during the build try to use:

    `cd android && ./gradlew clean`

    or

    `sh android/gradlew clean`

- iOS

    In RN >0.60 version remember to run (within iOS folder):

    `pod install`

    or for update libraries:

    `pod update`

You can find more info [here](https://github.com/facebook/react-native/issues/)

## Collaborating

   If you wish to to talk with us about this project, feel free to hop on our [![Discord Chat](https://img.shields.io/discord/682699728454025410.svg)](https://discord.gg/FwXcHnX)  
   
   If you found a bug, please report it in [issues](https://github.com/flotiq/flotiq-mobile-demo/issues).
