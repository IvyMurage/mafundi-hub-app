import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { Formik } from 'formik'


interface HandymanProps {
    first_name?: string | null;
    last_name?: string | null
    title?: string | null;
    service?: string | null;
    phone_number?: string | null;
    years_of_experience?: string | null;
    location?: string | null;
    description?: string | null;
    task_responsibilities?: string | null
}
const HandymanRegister = () => {
    const router = useRouter()

    const [handyman, setHandyman] = useState<HandymanProps>({
        first_name: '',
        last_name: '',
        title: '',
        service: '',
        phone_number: '',
        years_of_experience: '',
        location: '',
        description: '',
        task_responsibilities: ''
    })
    const handleSubmit = () => {
        router.push('/(image-picker)/image-picker')
    }
    return (
        <Formik
            initialValues={handyman}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, }) => (
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
                                    value={values.first_name!}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={() => setFieldTouched('first_name')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Second Name'
                                    value={values.last_name!}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={() => setFieldTouched('last_name')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Title (e.g Carpenter)'
                                    value={values.title!}
                                    onChangeText={handleChange('title')}
                                    onBlur={() => setFieldTouched('title')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />
                                <Select
                                    data={['Service', 'Handyman']}
                                    defaultButtonText='Service'
                                    searchPlaceHolder='Search for a service'
                                />

                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Phone number (e.g 07xxxx)'
                                    keyboardType='phone-pad'
                                    value={values.phone_number!}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={() => setFieldTouched('phone_number')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Years of  Experience (e.g 1)'
                                    value={values.years_of_experience!}
                                    onChangeText={handleChange('years_of_experience')}
                                    onBlur={() => setFieldTouched('years_of_experience')}
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
                                    value={values.description!}
                                    onChangeText={handleChange('description')}
                                    onBlur={() => setFieldTouched('description')}
                                    placeholder='Description(e.g I am a plumber .. '
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput, handymanRegisterStyles.textArea]}
                                />

                                <TextInput
                                    autoCapitalize='none'
                                    multiline
                                    numberOfLines={10}
                                    value={values.task_responsibilities!}
                                    onChangeText={handleChange('task_responsibilities')}
                                    onBlur={() => setFieldTouched('task_responsibilities')}
                                    placeholder='Task Responsibilities e.g(cleaning, house arrangement) '
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput, handymanRegisterStyles.textArea]}

                                />

                                <Pressable style={handymanRegisterStyles.submitBtn} onPress={() => handleSubmit}><Text style={handymanRegisterStyles.submitBtnText}>Submit</Text></Pressable>


                            </View >
                        </ScrollView >
                    </View >
                </SafeAreaView >
            )}
        </Formik>
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
export default HandymanRegister;

