import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'

const SignUp = () => {
    const router = useRouter()
    const handlePress = () => {
        router.push('/(modals)/login')
    }
    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: Colors.primary }}>
            <View style={[defaultStyles.container]}>
                <Text style={[defaultStyles.loginHeader]}>Mafundi <Text style={{ color: Colors.lighter }}>Hub</Text></Text>
                <Text style={{
                    fontFamily: 'poppins',
                    letterSpacing: 1.4,
                    color: Colors.lighter,
                    alignSelf: 'flex-start',
                    paddingLeft: 8,
                    position: 'absolute',
                    top: 100
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
                    <Text onPress={handlePress} style={[defaultStyles.authButtonText]}>Sign Up</Text>
                </Pressable>

                <Text style={[defaultStyles.authOption]}>Already Have an account?<Link href={'/(modals)/login'}><Text style={{ color: Colors.secondary, fontWeight: '700' }}>Login</Text></Link></Text>
            </View>
        </SafeAreaView>
    )
}

export default SignUp