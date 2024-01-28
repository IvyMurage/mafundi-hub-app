import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { Formik, FormikHelpers } from 'formik'
import { handymanSchema } from '@/constants/loginSchema'
import { useLocation } from '@/context/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/context/useService'
import { useAuth } from '@/context/AuthContext'
import { request } from '@/utils/executePostRequest'
import Loader from '@/components/loader'


interface HandymanProps {
    first_name?: string | null;
    last_name?: string | null
    title?: string | null;
    service?: string | null;
    phone_number?: string | null;
    years_of_experience?: string | null;
    location_attributes?: string | null;
    description?: string | null;
    handyman_skills?: string | null
}
const HandymanRegister = () => {
    const { userState } = useAuth()
    const router = useRouter()
    const locations = useLocation()
    const services = useService()
    const { authState } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alertVisible, setAlertVisible] = useState<boolean>(false)

    const [handyman] = useState<HandymanProps>({
        first_name: '',
        last_name: '',
        title: '',
        service: '',
        phone_number: '',
        years_of_experience: '',
        location_attributes: '',
        description: '',
        handyman_skills: ''
    })


    // console.log(locations)

    const handleSubmit = async (
        handyman: HandymanProps,
        resetForm: FormikHelpers<HandymanProps>) => {
        try {
            setIsLoading(true)
            const location = handyman.location_attributes?.split(', ')
            const payload = {
                ...handyman,
                service_id: parseInt(handyman.service!),
                location_attributes: {
                    city: location![0],
                    county: location![1],
                    country: location![2],
                },
                handyman_skills: handyman.handyman_skills?.trim().split(', '),
                user_id: userState?.id
            }

            const response = await request('POST', JSON.stringify(payload), 'handymen/create', authState?.token!)
            if (response) {
                setAlertVisible(true)
                resetForm.resetForm()
                router.push('/(modals)/handyman-profile')
            }
            console.log(response)
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Formik
            initialValues={handyman}
            onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
            validationSchema={handymanSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue, }) => (
                <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: Colors.primary }}>
                    <View style={handymanRegisterStyles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ width: 250, height: 200, }}
                                source={require('@/assets/images/handyman.svg')} />
                        </View>
                        <ScrollView
                            contentContainerStyle={handymanRegisterStyles.contentContainer}
                            style={handymanRegisterStyles.scroll}>
                            <View style={handymanRegisterStyles.subContainer}>

                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='First Name'
                                    value={values.first_name!}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={() => setFieldTouched('first_name')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
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
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
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
                                    placeholder='Title (e.g Carpenter)'
                                    value={values.title!}
                                    onChangeText={handleChange('title')}
                                    onBlur={() => setFieldTouched('title')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />

                                {
                                    touched.title && errors.title && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.title}
                                        </Text>
                                    )
                                }
                                <Select
                                    data={services || []}
                                    searchPlaceHolder='Search for a service'
                                    handleChange={(value) => setFieldValue('service', value)}
                                    defaultButtonText='Service'
                                />

                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Phone number (e.g 07xxxx)'
                                    inputMode='numeric'
                                    value={values.phone_number!}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={() => setFieldTouched('phone_number')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />

                                {
                                    touched.phone_number && errors.phone_number && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.phone_number}
                                        </Text>
                                    )
                                }
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Years of  Experience (e.g 1)'
                                    value={values.years_of_experience!}
                                    onChangeText={handleChange('years_of_experience')}
                                    onBlur={() => setFieldTouched('years_of_experience')}
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput]}
                                />

                                <Select
                                    data={locations?.length > 0 &&
                                        locations !== undefined &&
                                        locations?.map(location => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                                    defaultButtonText='Location'
                                    handleChange={(value) => setFieldValue('location_attributes', value)}
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
                                {
                                    touched.description && errors.description && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.description}
                                        </Text>
                                    )
                                }
                                <TextInput
                                    autoCapitalize='none'
                                    multiline
                                    numberOfLines={10}
                                    value={values.handyman_skills!}
                                    onChangeText={handleChange('handyman_skills')}
                                    onBlur={() => setFieldTouched('handyman_skills')}
                                    placeholder='Task Responsibilities e.g(cleaning, house arrangement) '
                                    style={[defaultStyles.inputTextField, handymanRegisterStyles.textInput, handymanRegisterStyles.textArea]}

                                />
                                <Pressable
                                    disabled={!isValid}
                                    style={[handymanRegisterStyles.submitBtn,
                                    { backgroundColor: isValid ? Colors.primary : '#a5c9ca' }
                                    ]}
                                    onPress={() => handleSubmit()}>
                                    <Text style={handymanRegisterStyles.submitBtnText}>
                                        Submit
                                    </Text>
                                </Pressable>
                            </View >
                        </ScrollView >
                    </View >
                    <Loader isLoading={isLoading} />
                </SafeAreaView >
            )}
        </Formik >
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

    },
})
export default HandymanRegister;

