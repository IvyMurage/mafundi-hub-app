import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const RegisterOptions = () => {
    const router = useRouter()
    const handlePressHandyman = () => {
        router.push('/(modals)/handyman-register')
    }
    const handlePressClient = () => {
        router.push('/(modals)/client-register')
    }
    function RegisterIcon(props: {
        name: React.ComponentProps<typeof FontAwesome5>['name'];
        color: string;
        size: number
    }) {
        return <FontAwesome5 style={{ marginBottom: -3, textAlign: 'center' }} {...props} />;
    }
    return (
        <View style={registerStyles.container}>
            <Text style={registerStyles.title}>Register as:</Text>

            <View style={registerStyles.registerBtn}>
                <Pressable onPress={handlePressHandyman}>
                    <RegisterIcon name='tools' color={Colors.lighter} size={50} />
                    <Text style={registerStyles.registerBtnText}>Handyman</Text>
                </Pressable>
            </View>

            <View style={registerStyles.registerBtn}>
                <Pressable onPress={handlePressClient}>
                    <RegisterIcon name='user-tie' color={Colors.lighter} size={50} />
                    <Text style={registerStyles.registerBtnText}>Client</Text>
                </Pressable>
            </View>
        </View>
    )
}

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.primary
    },
    title: {
        fontFamily: 'poppins-bold',
        fontSize: 18,
        letterSpacing: 2.16,
        textAlign: 'center',
        color: Colors.lighter
    },
    registerBtn: {
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 260,
        height: 180,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerBtnText: {
        color: Colors.lighter,
        textAlign: 'center',
        fontFamily: 'poppins-bold',
        fontSize: 18,
        letterSpacing: 2,
        paddingTop: 12
    },
})

export default RegisterOptions