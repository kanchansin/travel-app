import { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PlaceSearchBar = ({ onSelectPlace }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const url = `http://localhost:5000/places?input=${text}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.predictions) {
          setPlaces(data.predictions);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    } else {
      setPlaces([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place..."
        value={query}
        onChangeText={fetchPlaces}
      />
      {places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelectPlace(item.description);
                setQuery(item.description);
                setPlaces([]);
              }}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default PlaceSearchBar;