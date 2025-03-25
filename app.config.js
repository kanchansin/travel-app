import "dotenv/config";

export default {
  expo: {
    name: "ai-travel-app",
    slug: "ai-travel-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kanchan.travelapp"
    },
    android: {
      package: "com.anonymous.aitravelapp",
      adaptiveIcon: {
        backgroundColor: "#ffffff",
      },
      newArchEnabled: true,
    },
    web: { bundler: "metro", output: "static" },
    plugins: ["expo-router"],
    extra: {
      MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
      "eas": {
        "projectId": "4ec2aff5-399c-422d-9173-ff30c394ac43"
      },
    },
  },
};
