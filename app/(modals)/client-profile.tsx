import { View, ScrollView, SafeAreaView, TextInput, StyleSheet, Text, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import Colors from '@/constants/Colors'
import { useAuth } from '@/context/AuthContext'
import { Formik } from 'formik'
import { clientSchema } from '@/constants/loginSchema'

type ClientProfileProps = {

    first_name: string,
    last_name: string,
    phone_number: string,
    location_attributes: string

}
const ClientProfile = () => {
    const { userState, authState } = useAuth()
    const locations = useLocation()

    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<string>(require('@/assets/images/placeholder.jpg'))
    const [user, setUser] = useState<ClientProfileProps>({
        first_name: '',
        last_name: '',
        phone_number: '',
        location_attributes: ''
    })



    useEffect(() => {
        const fetchUser = async (userId: number) => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/${userId}/show`, {
                    headers: {
                        'Authorization': `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error)
                }

                if (response.ok) {
                    setUser({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        phone_number: data.phone_number,
                        location_attributes: `${data.location.city}, ${data.location.county}, ${data.location.country}`
                    })
                    console.log(user)
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchUser(userState?.user_id!)
    }, [])


    const handleSubmit = (values: ClientProfileProps) => {
        console.log(values)
        try {
            const updateUser = async (userId: number) => {
                setLoading(true)
                try {
                    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/${userId}/update`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${authState?.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                    const data = await response.json()
                    if (!response.ok) {
                        throw new Error(data.error)
                    }
                    if (response.ok) {
                        console.log(data)
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }
            updateUser(userState?.user_id!)
        }
        catch (error) {
            console.log(error)
        }

    }


    return (
        <Formik
            initialValues={user}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={clientSchema}
        >
            {({ handleChange, handleSubmit, setFieldTouched, errors, touched, setFieldValue, values }) => (
                <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: Colors.primary }}>
                    <View style={clientProfileStyles.container}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                marginBottom: 20,
                                marginTop: 1
                            }}
                            source={image}
                        />
                        <ScrollView
                            style={clientProfileStyles.scroll}
                            contentContainerStyle={clientProfileStyles.contentContainer}
                        >
                            <View style={clientProfileStyles.subContainer}>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='First Name'
                                    value={values.first_name}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={() => setFieldTouched('first_name')}
                                    style={[defaultStyles.inputTextField, clientProfileStyles.textInput]}
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
                                    value={values.last_name}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={() => setFieldTouched('last_name')}
                                    style={[defaultStyles.inputTextField, clientProfileStyles.textInput]}
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
                                    placeholder='Phone Number(07xxxx)'
                                    inputMode='numeric'
                                    value={values.phone_number}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={() => setFieldTouched('phone_number')}
                                    style={[defaultStyles.inputTextField, clientProfileStyles.textInput]}
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
                                    defaultButtonText={values.location_attributes}
                                    profile={true}
                                    handleChange={(value) => setFieldValue('location_attributes', value)}
                                    searchPlaceHolder='Search for a Location'
                                />

                                {
                                    touched.location_attributes && errors.location_attributes && (
                                        <Text style={[defaultStyles.errorText]}>
                                            {errors.location_attributes}
                                        </Text>
                                    )
                                }
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            )}
        </Formik>
    )
}
const clientProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',

    },
    subContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 50,
    },
    scroll: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.light,
        overflow: 'scroll',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // marginTop: 12,

    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: Colors.secondary,
        paddingLeft: 20,
        marginBottom: 30,
    },

})
export default ClientProfile