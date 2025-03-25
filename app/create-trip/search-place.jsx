import React, { useState } from "react";
import { TextInput, FlatList, TouchableOpacity, Text, View } from "react-native";
import { MAPBOX_PUBLIC_TOKEN } from "@env";

const PlaceSearchBar = ({ onSelectPlace }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        text
      )}.json?access_token=${MAPBOX_PUBLIC_TOKEN}&autocomplete=true&limit=5`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features) {
          setPlaces(
            data.features.map((place) => ({
              name: place.text,
              coordinates: place.center,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    } else {
      setPlaces([]);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search for a place..."
        value={query}
        onChangeText={fetchPlaces}
        style={{ height: 40, borderBottomWidth: 1 }}
      />
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onSelectPlace(item);
              setQuery(item.name);
              setPlaces([]);
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PlaceSearchBar;