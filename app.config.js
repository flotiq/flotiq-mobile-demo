const fs = require("fs");
const BUILD_NUMBER_AND_VERSION = fs.readFileSync("VERSION", {
  encoding: "utf8",
});
const BUILD_NUMBER = fs.readFileSync("BUILD_NUMBER", { encoding: "utf8" });

module.exports = {
  expo: {
    name: "Flotiq Mobile Expo",
    slug: "flotiq-mobile-demo",
    version: "3.0.2",
    orientation: "portrait",
    owner: "codewave",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/91c1d9e8-7528-45e5-bd42-7ed897844cb1",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      icon: "./assets/iconIOS.png",
      supportsTablet: true,
      bundleIdentifier: "eu.codewave.flotiqmobiledemo",
      buildNumber: BUILD_NUMBER_AND_VERSION,
    },
    android: {
      icon: "assets/iconAndroid.png",
      package: "com.flotiqmobiledemo",
      versionCode: +BUILD_NUMBER,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "91c1d9e8-7528-45e5-bd42-7ed897844cb1",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
};
