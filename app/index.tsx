import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/FirebaseConfig";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import Login from "./components/Login";
import Mapbox from "@rnmapbox/maps";
import Constants from "expo-constants";

const MAPBOX_PUBLIC_TOKEN = Constants.expoConfig?.extra?.MAPBOX_PUBLIC_TOKEN;

if (MAPBOX_PUBLIC_TOKEN) {
  Mapbox.setAccessToken(MAPBOX_PUBLIC_TOKEN);
} else {
  console.error("Mapbox token is missing.");
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        router.replace("/mytrip");
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return <Login />;
}
