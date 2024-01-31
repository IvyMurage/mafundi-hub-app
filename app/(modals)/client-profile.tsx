import { View, ScrollView, SafeAreaView, TextInput, StyleSheet, Text, Pressable, ActivityIndicator, } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import Colors from '@/constants/Colors'
import { Formik } from 'formik'
import { clientSchema } from '@/constants/loginSchema'
import CustomAlert from '@/components/customAlert'
import { useClientFetcher, useClientUpdate } from '@/hooks/useClient'
import Loader from '@/components/loader'

const ClientProfile = () => {
    const locations = useLocation()
    const { handleSubmit, loading, image, visible, setVisible } = useClientUpdate()
    const { isLoading, user } = useClientFetcher()

    return (
        <Formik
            initialValues={user}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={clientSchema}
            enableReinitialize={true}
        >
            {({ handleChange, handleSubmit, setFieldTouched, errors, touched, setFieldValue, values, isValid }) => (
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

                                <Pressable
                                    disabled={!isValid}
                                    onPress={() => handleSubmit()}
                                    style={[defaultStyles.authButton,
                                    {
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 50,
                                        marginTop: 30,
                                        backgroundColor: isValid ? Colors.primary : '#a5c9ca'
                                    }]} >
                                    {loading && <ActivityIndicator size="large" color="white" />}

                                    <Text style={defaultStyles.authButtonText}>Save</Text>
                                </Pressable>

                                <CustomAlert
                                    visible={visible}
                                    onClose={() => setVisible(false)}
                                    message='Profile Updated Successfully'
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <Loader isLoading={isLoading} />

                </SafeAreaView >
            )}
        </Formik >
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
        marginTop: 12,

    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: Colors.secondary,
        paddingLeft: 20,
        marginBottom: 30,
    },

})
export default ClientProfile