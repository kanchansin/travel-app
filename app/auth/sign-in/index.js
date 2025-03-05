import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../configs/FirebaseConfig';

const showToast = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
        Alert.alert("Error", message);
    }
};

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail]=useState();
    const [password, setPassword]=useState();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    },[])

    const onSignIn=()=>{

        if (!email || !password)
        {
            showToast("Enter Email and Password");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            router.replace('/mytrip')
          
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode=='auth/invalid-credential')
                {
                    ToastAndroid.show("Invalid credentials",ToastAndroid.LONG)
                }
            });
    }

  return (
    <View style={{
        padding:25,
        marginTop:60,
    }}>
    <Text style={{
        fontFamily:'nunito-bold',
        fontSize:30,
        color:Colors.light.primaryText,
        marginTop: 100,
    }}>Log in
    </Text>
    <View style={{
        marginTop:100,
    }}>
        {/* Input Fields */}
        <TextInput style={styles.input}
         placeholder="Email" 
         onChangeText={(value) => setEmail(value)}
         placeholderTextColor={Colors.light.secondaryText} />
        <TextInput style={styles.input} 
        placeholder="Password" 
        onChangeText={(value) => setPassword(value)}
        secureTextEntry 
        placeholderTextColor={Colors.light.secondaryText} />
    </View>
    <View>
        <TouchableOpacity style={styles.LogInButton} onPress={onSignIn}>
            <Text style={styles.LogInButtonText}>Log in</Text>
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
        <TouchableOpacity style={styles.SignUpButton} onPress={() => router.push('/auth/sign-up')}>
            <Text style={styles.SignUpButtonText}>Create Account</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontFamily:'nunito',
        fontSize: 20,
        padding: 12,
        marginBottom: 15,
        borderBottomWidth: 2,
        color: Colors.light.primaryText,
    },
    LogInButton: {
        padding: 15,
        borderRadius: 99,
        backgroundColor:Colors.dark.button,
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    SignUpButton: {
        padding: 15,
        borderRadius: 99,
        backgroundColor:Colors.light.button,
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    LogInButtonText: {
        color: Colors.dark.primaryText,
        fontSize: 17,
        fontFamily: 'nunito-medium',
    },
    SignUpButtonText: {
        color: Colors.light.primaryText,
        fontSize: 17,
        fontFamily: 'nunito-medium',
    },
})