import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../constants/Colors'
import StartNewTripCard from './../components/MyTrips/StartNewTripCard';

export default function MyTrip() {

  const [ userTrips, setUserTrips ] = useState([]);

  return (
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.light.background,
      height: '100%',

    }}>
      <View>
        <Text style={{
          fontFamily: 'nunito-bold',
          fontSize: 30,
        }}>My Trip</Text>
        </View>

      {userTrips?.length==0?
        <StartNewTripCard/>
        :null
      }
    </View>
  )
}