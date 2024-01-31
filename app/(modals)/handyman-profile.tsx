import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { Formik, } from 'formik'
import { handymanSchema } from '@/constants/loginSchema'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'


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
const HandymanProfile = () => {
    const { userState } = useAuth()
    const router = useRouter()
    const locations = useLocation()
    const services = useService()
    const { authState } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [alertVisible, setAlertVisible] = useState<boolean>(false)
    const [image, setImage] = useState<string>(require('@/assets/images/placeholder.jpg'))

    const [handyman, setHandyman] = useState<HandymanProps>({
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

    const handleSubmit = async (handyman: HandymanProps) => {
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
                years_of_experience: parseInt(handyman.years_of_experience!),
                handyman_skills: handyman.handyman_skills?.trim().split(', '),
                user_id: userState?.id
            }
            delete payload.service
            console.log(payload)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${userState?.user_id}/update`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authState?.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error)
            }
            if (response.ok) {
                setIsLoading(false)
                console.log(data)
            }
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async (userId: number) => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${userId}/show`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error)
                }
                if (response.ok) {
                    setHandyman({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        title: data.title,
                        service: data.service_name,
                        phone_number: data.phone_number,
                        years_of_experience: data.years_of_experience,
                        location_attributes: `${data.location?.city}, ${data.location?.county}, ${data.location?.country}`,
                        description: data.description,
                        handyman_skills: data.handyman_skills?.join(', ')
                    })
                    console.log(data)
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser(userState?.user_id!)
    }, [])

    return (
        <Formik
            initialValues={handyman}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={handymanSchema}
            enableReinitialize={true}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue, }) => (
                <>
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: Colors.primary }}>
                        <View style={HandymanProfileStyles.container}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 100,
                                        marginBottom: 20,
                                        marginTop: 1
                                    }}
                                    source={image} />
                            </View>
                            <ScrollView
                                contentContainerStyle={HandymanProfileStyles.contentContainer}
                                style={HandymanProfileStyles.scroll}>
                                <View style={HandymanProfileStyles.subContainer}>

                                    <TextInput
                                        autoCapitalize='none'
                                        placeholder='First Name'
                                        value={values.first_name!}
                                        onChangeText={handleChange('first_name')}
                                        onBlur={() => setFieldTouched('first_name')}
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput]}
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
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput]}
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
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput]}
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
                                        defaultButtonText={services.find(service => service.key === parseInt(values.service!))?.label || 'Service'}
                                        profile={true}
                                    />

                                    <TextInput
                                        autoCapitalize='none'
                                        placeholder='Phone number (e.g 07xxxx)'
                                        inputMode='numeric'
                                        value={values.phone_number!}
                                        onChangeText={handleChange('phone_number')}
                                        onBlur={() => setFieldTouched('phone_number')}
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput]}
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
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput]}
                                    />

                                    <Select
                                        data={locations?.length > 0 &&
                                            locations !== undefined &&
                                            locations?.map(location => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                                        defaultButtonText={values.location_attributes! || 'Location'}
                                        handleChange={(value) => setFieldValue('location_attributes', value)}
                                        searchPlaceHolder='Search for a Location'
                                        profile={true}
                                    />
                                    <TextInput
                                        autoCapitalize='none'
                                        multiline
                                        numberOfLines={10}
                                        value={values.description!}
                                        onChangeText={handleChange('description')}
                                        onBlur={() => setFieldTouched('description')}
                                        placeholder='Description(e.g I am a plumber .. '
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput, HandymanProfileStyles.textArea]}
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
                                        style={[defaultStyles.inputTextField, HandymanProfileStyles.textInput, HandymanProfileStyles.textArea]}

                                    />
                                    <Pressable
                                        disabled={!isValid}
                                        style={[
                                            HandymanProfileStyles.submitBtn,
                                            {
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: isValid ? Colors.primary : '#a5c9ca'
                                            }
                                        ]}
                                        onPress={() => handleSubmit()}>
                                        {isLoading && <ActivityIndicator size="large" color="white" />}

                                        <Text style={HandymanProfileStyles.submitBtnText}>
                                            Submit
                                        </Text>
                                    </Pressable>
                                </View >
                                <CustomAlert
                                    visible={alertVisible}
                                    message='Profile Updated Successfully'
                                    onClose={() => setAlertVisible(false)}
                                />
                            </ScrollView >
                        </View >
                    </SafeAreaView >
                    <Loader isLoading={loading} />
                </>
            )}
        </Formik >
    )
}


const HandymanProfileStyles = StyleSheet.create({
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
        paddingBottom: 100,
    },
    textInput: {
        borderColor: Colors.secondary,
        borderBottomWidth: 2
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
export default HandymanProfile;

