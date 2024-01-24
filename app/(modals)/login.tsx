import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'

const Login = () => {
    const router = useRouter()

    const handleImpress = () => {
        router.push('/(onboard)/register-option')
    }
    return (
        <SafeAreaView style={{ padding: 20, flex: 1, backgroundColor: Colors.primary }}>
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
                    <Text onPress={handleImpress} style={[defaultStyles.authButtonText]}>Login</Text>
                </Pressable>

                <Text style={[defaultStyles.authOption]}>Don't Have an account? <Link href={'/(modals)/sign-up'}><Text style={{ color: Colors.secondary, fontWeight: '700' }}> Sign Up </Text> </Link></Text>
            </View>
        </SafeAreaView>
    )
}

export default Login