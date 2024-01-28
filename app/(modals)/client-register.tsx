import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { useLocation } from '@/context/useLocation'
import { Formik, FormikHelpers } from 'formik'
import { stringfy } from '@/utils/stringify'

interface ClientProps {
    first_name: string | null,
    last_name: string | null,
    phone_number: string | null,
    location: string | null
}


const ClientRegister = () => {
    const router = useRouter()
    const locations = useLocation()
    const [client] = useState<ClientProps>({
        first_name: '',
        last_name: '',
        phone_number: '',
        location: ''
    })
    const handleSubmit = (values: ClientProps, resetForm: FormikHelpers<ClientProps>) => {
        console.log(values)
    }
    return (
        <Formik
            initialValues={client}
            onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}

        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue }) => (
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
                    <View style={ClientRegisterStyles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ width: 200, height: 150, resizeMode: 'contain' }}
                                source={require('@/assets/images/client.svg')}
                            />
                            <View style={ClientRegisterStyles.titleContainer}>
                                <Text style={ClientRegisterStyles.titleText}>
                                    Join Mafundi Hub: Your Handyman Solution! Register Now!
                                </Text>
                            </View>
                        </View>
                        <ScrollView
                            contentContainerStyle={ClientRegisterStyles.contentContainer}
                            style={ClientRegisterStyles.scroll}>
                            <View style={ClientRegisterStyles.subContainer}>

                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='First Name'
                                    value={values.first_name!}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={() => setFieldTouched('first_name')}
                                    style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                                />
                                {
                                    touched.first_name && errors.first_name && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.first_name}
                                        </Text>
                                    )
                                }
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Last Name'
                                    value={values.last_name!}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={() => setFieldTouched('last_name')}
                                    style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                                />

                                {
                                    touched.last_name && errors.last_name && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.last_name}
                                        </Text>
                                    )
                                }
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Phone number (e.g 07xxxx)'
                                    inputMode='numeric'
                                    value={values.phone_number!}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={() => setFieldTouched('phone_number')}
                                    style={[defaultStyles.inputTextField, ClientRegisterStyles.textInput]}
                                />

                                {
                                    touched.phone_number && errors.phone_number && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.phone_number}
                                        </Text>
                                    )
                                }

                                <Select
                                    data={locations?.length > 0 &&
                                        locations !== undefined &&
                                        locations?.map((location) => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                                    defaultButtonText='Location'
                                    handleChange={(value) => setFieldValue('location_attributes', value)}
                                    searchPlaceHolder='Search for a Location'
                                />

                                <Pressable
                                    disabled={!isValid}
                                    style={[ClientRegisterStyles.submitBtn, { backgroundColor: isValid ? Colors.secondary : '#a5c9ca' }]}
                                    onPress={() => handleSubmit()}>
                                    <Text style={ClientRegisterStyles.submitBtnText}>Submit</Text>
                                </Pressable>
                            </View >
                        </ScrollView >
                    </View >
                </SafeAreaView >
            )}
        </Formik>
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
        flexGrow: 1,
        backgroundColor: Colors.light,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
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
        marginTop: 10
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

