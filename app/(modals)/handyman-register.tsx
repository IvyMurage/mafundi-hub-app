import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'



const HandymanRegister = () => {
    const router = useRouter()
    const handleSubmit = () => {
        router.push('/(image-picker)/image-picker')
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: Colors.primary }}>
            <View style={handymanRegisterStyles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ width: 250, height: 200, }} source={require('@/assets/images/handyman.svg')} />
                </View>
                <ScrollView contentContainerStyle={handymanRegisterStyles.contentContainer} style={handymanRegisterStyles.scroll}>
                    <View style={handymanRegisterStyles.subContainer}>

                        <TextInput
                            autoCapitalize='none'
                            placeholder='First Name'
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                        />
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Second Name'
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                        />
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Title (e.g Carpenter)'
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                        />
                        <Select
                            data={['Service', 'Handyman']}
                            defaultButtonText='Service'
                            searchPlaceHolder='Search for a service'
                        />

                        <TextInput
                            autoCapitalize='none'
                            placeholder='Title (e.g Carpenter)'
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                        />
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Years of  Experience (e.g 1)'
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                        />
                        <Select
                            data={['Years', 'Months']}
                            defaultButtonText='Location'
                            searchPlaceHolder='Search for a Location'
                        />
                        <TextInput
                            autoCapitalize='none'
                            multiline
                            numberOfLines={10}
                            placeholder='Description(e.g I am a plumber .. '
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput, handymanRegisterStyles.textArea]}
                        />

                        <TextInput
                            autoCapitalize='none'
                            multiline
                            numberOfLines={10}
                            placeholder='Task Responsibilities e.g(cleaning, house arrangement) '
                            style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput, handymanRegisterStyles.textArea]}

                        />

                        <Pressable style={handymanRegisterStyles.submitBtn} onPress={handleSubmit}><Text style={handymanRegisterStyles.submitBtnText}>Submit</Text></Pressable>


                    </View >
                </ScrollView >
            </View >
        </SafeAreaView >
    )
}


const handymanRegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    subContainer: {
        backgroundColor: Colors.light,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',
        paddingBottom: 30,
    },
    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1
    },
    textArea: {
        paddingTop: 0,
        height: 100
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        width: 357,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 25,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16

    }
})
export default HandymanRegister

