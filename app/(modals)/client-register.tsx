import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'



const ClientRegister = () => {
    const router = useRouter()
    const handleSubmit = () => {
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={ClientRegisterStyles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 150, resizeMode: 'contain' }} source={require('@/assets/images/client.svg')} />
                    <View style={ClientRegisterStyles.titleContainer}>
                        <Text style={ClientRegisterStyles.titleText}>
                            Join Mafundi Hub: Your Handyman Solution! Register Now!
                        </Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={ClientRegisterStyles.contentContainer} style={ClientRegisterStyles.scroll}>
                    <View style={ClientRegisterStyles.subContainer}>

                        <TextInput
                            autoCapitalize='none'
                            placeholder='First Name'
                            style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                        />
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Second Name'
                            style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                        />
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Phone Number (e.g 07xxxx)'
                            style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                        />
                        <Select
                            data={['Ruiru', 'Juja']}
                            defaultButtonText='Location'
                            searchPlaceHolder='Search for a location'
                        />

                        <Pressable style={ClientRegisterStyles.submitBtn} onPress={handleSubmit}>
                            <Text style={ClientRegisterStyles.submitBtnText}>Submit</Text>
                        </Pressable>
                    </View >
                </ScrollView >
            </View >
        </SafeAreaView >
    )
}


const ClientRegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',
    },
    titleText: {
        fontFamily: 'poppins-medium',
        fontSize: 14,
        letterSpacing: 1.6,
        textAlign: 'center',
        color: Colors.lighter,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    subContainer: {
        flexGrow:1,
        backgroundColor: Colors.light,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:20
    },
    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1
    },

    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        width: 357,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    },
    submitBtnText: {
        color: Colors.lighter,
        fontFamily: 'poppins-semibold',
        fontSize: 18,
        letterSpacing: 1.8,
        textAlign: 'center'

    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16

    }
})
export default ClientRegister

