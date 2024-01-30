import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { useLocation } from '@/hooks/useLocation'
import { Formik, FormikHelpers } from 'formik'
import { stringfy } from '@/utils/stringify'
import { useAuth } from '@/context/AuthContext'
import { request } from '@/utils/executePostRequest'
import { clientSchema } from '@/constants/loginSchema'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'

interface ClientProps {
    first_name: string | null,
    last_name: string | null,
    phone_number: string | null,
    location_attributes: string | null
}


const ClientRegister = () => {
    const router = useRouter()
    const locations = useLocation()
    const { authState, userState } = useAuth()
    const [client] = useState<ClientProps>({
        first_name: '',
        last_name: '',
        phone_number: '',
        location_attributes: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (client: ClientProps, resetForm: FormikHelpers<ClientProps>) => {
        try {
            setIsLoading(true)
            const location = client.location_attributes?.split(', ')
            const payload = {
                ...client,
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                user_id: userState?.id
            }
            const result = await request('POST', JSON.stringify(payload), 'clients/create', authState?.token!)
            const { response, data } = result
            if (response.ok) {
                resetForm.resetForm()
                router.push('/(modals)/client-profile')
            }
            setIsLoading(false)
        }
        catch (err: string | any) {
            console.log(err.message)
            setAlertVisible(true)
            setError(true)
            setErrorMessage(err.message)
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Formik
            initialValues={client}
            onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
            validationSchema={clientSchema}
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
                                    Join Mafundi Hub: Your client Solution! Register Now!
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
                                        locations?.map((location) => {
                                            return {
                                                label: stringfy(location),
                                                value: stringfy(location)
                                            }
                                        }) || []}
                                    defaultButtonText='Location'
                                    handleChange={(value) => setFieldValue('location_attributes', value)}
                                    searchPlaceHolder='Search for a Location'
                                    profile={false}
                                />
                                {
                                    touched.location_attributes && errors.location_attributes && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.location_attributes}
                                        </Text>
                                    )
                                }

                                <Pressable
                                    disabled={!isValid}
                                    style={[ClientRegisterStyles.submitBtn, { backgroundColor: isValid ? Colors.secondary : '#a5c9ca' }]}
                                    onPress={() => handleSubmit()}>
                                    <Text style={ClientRegisterStyles.submitBtnText}>Submit</Text>
                                </Pressable>
                            </View >
                        </ScrollView >
                    </View >

                    {error && <CustomAlert
                        visible={alertVisible}
                        message={errorMessage}
                        onClose={() => {
                            setAlertVisible(false)
                        }}
                    />}
                    <Loader isLoading={isLoading} />
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

