import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'

const SignUp = () => {
    return (
        <View style={[defaultStyles.container]}>
            <Text style={[defaultStyles.loginHeader]}>Mafundi <Text style={{ color: Colors.lighter }}>Hub</Text></Text>
            <Text style={{
                fontFamily: 'poppins',
                letterSpacing: 1.4,
                color: Colors.lighter,
            }}>
                Create Your account
            </Text>

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

            <TextInput
                autoCapitalize='none'
                placeholder='Confirm Password'
                style={[defaultStyles.inputTextField]}
            />

            <Pressable style={[defaultStyles.authButton]}>
                <Text style={[defaultStyles.authButtonText]}>Sign Up</Text>
            </Pressable>

            <Text style={[defaultStyles.authOption]}>Already Have an account? <Text style={{ color: Colors.secondary, fontWeight: '700' }}> Sign Up </Text> </Text>
        </View>
    )
}

export default SignUp