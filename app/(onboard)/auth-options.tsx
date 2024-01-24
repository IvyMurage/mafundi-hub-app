import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const AuthOPtions = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: Colors.primary
        }}>
            <View style={authOptionStyles.container}>
                <Text style={[authOptionStyles.title, { color: Colors.secondary }]}>Mafundi <Text style={{ color: Colors.lighter }}>Hub</Text></Text>
                <Image
                    style={{ width: 300, height: 200 }}
                    source={require('@/assets/images/auth.png')}
                />
                <Text style={authOptionStyles.authText}>Effortless Repairs at Your
                    Fingertips with Mafundi Hub</Text>
                <Text style={authOptionStyles.authSubText}>Lorem ipsum dolor sit amet consectetur. Magna augue augue dignissim purus. Pretium tincidun</Text>
                <View style={authOptionStyles.btnContainer}>
                    <Pressable style={[authOptionStyles.authButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.secondary }]}><Link style={authOptionStyles.authButtonText} href={'/(modals)/sign-up'}><Text>Sign Up</Text></Link></Pressable>
                    <Pressable style={authOptionStyles.authButton}><Link style={authOptionStyles.authButtonText} href={'/(modals)/login'}><Text>Login</Text></Link></Pressable>

                </View>
            </View>
        </SafeAreaView>
    )
}


const authOptionStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    title: {
        fontFamily: 'poppins-bold',
        fontSize: 30,
        letterSpacing: 3.6
    },

    authText: {
        color: Colors.lighter,
        textAlign: 'center',
        fontFamily: 'poppins-medium',
        fontSize: 20,
        letterSpacing: 2

    },
    authButton: {
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 156,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },

    authButtonText: {
        color: Colors.lighter,
        textAlign: 'center',
        fontFamily: 'poppins-semibold',
        fontSize: 16,
        letterSpacing: 2,
    },
    authSubText: {
        color: Colors.lighter,
        textAlign: 'center',
        fontFamily: 'poppins',
        padding: 20,
        fontSize: 14,
        letterSpacing: 1.4
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    }

})

export default AuthOPtions