import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import PlaceSearchBar from '../../create-trip/search-place';

export default function StartNewTripCard() {

    const router = useRouter();
    const [selectedPlace, setSelectedPlace] = useState('');

    return (
        <View style={{ flex: 1, padding: 20 }}>
          <PlaceSearchBar onSelectPlace={setSelectedPlace} />
          {selectedPlace ? <Text>Selected: {selectedPlace}</Text> : null}
            <Ionicons name="location-sharp" size={30} color={"black"} />
            <Text style={{
                fontSize:25,
                fontFamily:'nunito-medium',
            }}>No trips planned yet</Text>
            <TouchableOpacity
            onPress={()=>router.push('/create-trip/search-place')}
            style={{
            padding:10,
            backgroundColor:Colors.light.button,
            borderRadius:15,
            paddingHorizontal:30,
            marginTop: 25,
        }}
        >
            <Text style={{
                color:Colors.dark.button,
                fontFamily:'nunito-regular',
                fontSize:17,
            }}>Start a new trip</Text>
        </TouchableOpacity>
    </View>
  )
}
