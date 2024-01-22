import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'

const Login = () => {
    return (
        <View style={[defaultStyles.container]}>
            <Text style={[defaultStyles.loginHeader]}>Welcome Back!</Text>

            <Image style={{ width: 300, height: 200 }} source={require('@/assets/images/auth-image.svg')} />

            <Text style={[defaultStyles.loginSubHeader]}>Login</Text>

            <TextInput
                autoCapitalize='none'
                placeholder='Email'
                style={[defaultStyles.inputTextField]}
            />

            <TextInput
                autoCapitalize='none'
                placeholder='Password'
                style={[defaultStyles.inputTextField]}
            />

            <Pressable style={[defaultStyles.authButton]}>
                <Text style={[defaultStyles.authButtonText]}>Login</Text>
            </Pressable>

            <Text style={[defaultStyles.authOption]}>Already Have an account? <Text  style={{ color: Colors.secondary, fontWeight:'700'}}> Sign Up </Text> </Text>
        </View>
    )
}

export default Login