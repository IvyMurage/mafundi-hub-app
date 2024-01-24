import { View, Text, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome5 } from '@expo/vector-icons'
import Select from '@/components/select'



const HandymanRegister = () => {

    function SearchIcon(props: {
        name: React.ComponentProps<typeof FontAwesome5>['name'];
        color: string;
        size: number
    }) {
        return <FontAwesome5 style={{ marginBottom: -3, textAlign: 'center' }} {...props} />;
    }
    return (
        <View style={handymanRegisterStyles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ top: 24, zIndex: 10, width: 260, height: 200 }} source={require('@/assets/images/handyman.png')} />
            </View>
            <ScrollView contentContainerStyle={
                {
                    flexGrow: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    overflow: 'scroll',
                    marginTop: 20,
                    paddingBottom: 20,
                    backgroundColor: Colors.light

                }

            } style={handymanRegisterStyles.scroll}>



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

                    <Pressable style={handymanRegisterStyles.submitBtn}><Text style={handymanRegisterStyles.submitBtnText}>Submit</Text></Pressable>


                </View >
            </ScrollView >
        </View >
    )
}


const handymanRegisterStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',
        marginTop: 20,
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    subContainer: {
        backgroundColor: Colors.light,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 12,
        overflow: 'scroll',
        paddingBottom: 30


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
})
export default HandymanRegister