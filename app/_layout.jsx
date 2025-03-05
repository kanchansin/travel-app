import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { CreateTripContext } from "./context/CreateTripContext";
import { useState } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "nunito": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "nunito-italic": require("./assets/fonts/Nunito-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const [tripData, setTripData] = useState([]);

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

    </CreateTripContext.Provider>
  );
}
