# Flotiq Mobile Demo

## [Flotiq API documentation](https://flotiq.com/docs/API/)

# SETUP

- To prepare development environment follow up with an official React Native guide. This project was created with RN CLI.

    `https://reactnative.dev/docs/environment-setup  -- React Native CLI Quickstart`

## Android Studio
- If You have any problem with setting up Android Studio try to use version added to ToolBox from JetBrains.

    `https://www.jetbrains.com/toolbox-app/`

## xCode
- The only version which You can use is in AppStore. It should work, usually...

## React-Native - PROJECT
(`nodejs` is must.)

- Clone the project and run:

    `npm install`

- You have to run device simulator (iOS, Android) or use a real device (Android - https://developer.android.com/studio/debug/dev-options , https://developer.apple.com/documentation/xcode/running_your_app_in_the_simulator_or_on_a_device ).
- Run project:

    `npx react-native run-android`
    `npx react-native run-ios`

    Sometimes there is an issue with starting `metro` server. In separate window run it manually:

    `npx react-native run`

- You can also start the project directly from Android Studio or xCode.

## ISSUES
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
