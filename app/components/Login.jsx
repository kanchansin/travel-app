import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/app/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();

    return (
        <ImageBackground 
            source={require('./../assets/images/login.jpg')} 
            style={styles.imageBackground}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>AI Travel Planner</Text>
                <Text style={styles.subtitle}>Uncover the Best Places, Instantly.</Text>

                {/* Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/sign-in')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 25,
        borderRadius: 20,
        width: '85%',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontFamily: 'nunito-bold',
        textAlign: 'center',
        color: Colors.dark.primaryText,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'nunito-italic',
        textAlign: 'center',
        color: Colors.dark.secondaryText,
        marginBottom: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.dark.button,
        borderRadius: 99,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.White,
        fontSize: 17,
        fontFamily: 'nunito-regular',
    },
});
