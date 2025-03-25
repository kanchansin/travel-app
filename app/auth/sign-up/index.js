import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import axios from "axios";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = async () => {
    if (!email || !password || !fullName) {
      console.log("Enter all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        displayName: fullName,
      });

      console.log(response.data);
      router.push('/mytrip');
    } catch (error) {
      console.log("Error:", error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <View style={{
        padding:25,
        marginTop:60,
    }}>
    <Text style={{
        fontFamily:'nunito-bold',
        fontSize:30,
        color:Colors.light.primaryText,
    }}>Sign up
    </Text>
    <View style={{
        marginTop:100,
    }}>
        {/* Input Fields */}
        <TextInput style={styles.input}
          placeholder="Name"
          onChangeText={(value)=>setFullName(value)}
          placeholderTextColor={Colors.light.secondaryText} />
        <TextInput 
        style={styles.input} 
        placeholder="Email" 
        onChangeText={(value) => setEmail(value)}
        placeholderTextColor={Colors.light.secondaryText} />
        <TextInput 
        style={styles.input} 
        placeholder="Password" 
        onChangeText={(value) => setPassword(value)}
        secureTextEntry 
        placeholderTextColor={Colors.light.secondaryText} />
    </View>
    <View>
            <TouchableOpacity 
            style={styles.SignUpButton} 
            onPress={onCreateAccount}>
                <Text style={styles.SignUpButtonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{
                fontFamily:'nunito-regular',
                fontSize: 15,
                marginTop: 20,
                textAlign: 'center',
            }}>
                or
            </Text>
        </View>
        <View>
            <TouchableOpacity style={styles.SignInButton} onPress={() => router.push('/auth/sign-in')}>
                <Text style={styles.SignInButtonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontFamily:'nunito',
        padding: 12,
        marginBottom: 15,
        borderBottomWidth: 2,
        color: Colors.light.primaryText,
    },
    SignUpButton: {
      padding: 15,
      borderRadius: 99,
      backgroundColor:Colors.dark.button,
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
    },
    SignInButton: {
      padding: 15,
      borderRadius: 99,
      backgroundColor:Colors.light.button,
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
    },
    SignUpButtonText: {
      color: Colors.dark.primaryText,
      fontSize: 17,
      fontFamily: 'nunito-medium',
    },
    SignInButtonText: {
      color: Colors.light.primaryText,
      fontSize: 17,
      fontFamily: 'nunito-medium',
    },
})