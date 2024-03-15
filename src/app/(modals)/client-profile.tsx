import { View, ScrollView, SafeAreaView, TextInput, Text, Pressable, ActivityIndicator, } from 'react-native'
import { Image } from 'expo-image'
import { clientProfileStyles, defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import Colors from '@/constants/Colors'
import { Formik } from 'formik'
import { clientSchema } from '@/constants/validation-schema'
import CustomAlert from '@/components/customAlert'
import { useClientFetcher, useClientUpdate } from '@/hooks/useClient'
import Loader from '@/components/loader'
import {Ionicons } from '@expo/vector-icons'
import { useProfileUpload } from '@/hooks/useProfileUpload'
import { useAuth } from '@/contexts/AuthContext'

const ClientProfile = () => {
    const locations = useLocation()
    const { handleSubmit, loading, visible, setVisible } = useClientUpdate()
    const { isLoading, user } = useClientFetcher()
    const { pickImage } = useProfileUpload()
    const { userState } = useAuth()

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
                            placeholderContentFit='cover'
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 80,
                                marginBottom: 20,
                                marginTop: 1,
                                borderColor: Colors.secondary,
                                borderWidth: 2
                            }}
                            placeholder={require('@/assets/images/placeholder.jpg')}
                            source={{ uri: userState?.avatar_url! }}
                        />
                        <Pressable style={clientProfileStyles.cameraContainer} onPress={() => {
                            pickImage()
                        }}>
                            <Ionicons name='camera' color={Colors.lighter} size={20} />
                        </Pressable>

                        <ScrollView
                            style={clientProfileStyles.scroll}
                            contentContainerStyle={clientProfileStyles.contentContainer}
                        >
                            <View style={clientProfileStyles.subContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>

                                        <View style={[clientProfileStyles.textContainer]} >
                                            <Ionicons name="person-circle-outline" size={20} color={Colors.primary} style={{ alignSelf: 'center' }} />
                                            <TextInput
                                                autoCapitalize='none'
                                                placeholder='First Name'
                                                value={values.first_name}
                                                onChangeText={handleChange('first_name')}
                                                onBlur={() => setFieldTouched('first_name')}
                                                style={[clientProfileStyles.textInput]}
                                            />
                                        </View>
                                        {
                                            touched.first_name && errors.first_name && (
                                                <Text style={[defaultStyles.errorText]}>
                                                    {errors.first_name}
                                                </Text>
                                            )
                                        }
                                    </View>

                                    <View>
                                        <View style={[clientProfileStyles.textContainer]}>
                                            <TextInput
                                                autoCapitalize='none'
                                                placeholder='Last Name'
                                                value={values.last_name}
                                                onChangeText={handleChange('last_name')}
                                                onBlur={() => setFieldTouched('last_name')}
                                                style={[clientProfileStyles.textInput]}
                                            />
                                        </View>
                                        {
                                            touched.last_name && errors.last_name && (
                                                <Text style={[defaultStyles.errorText]}>
                                                    {errors.last_name}
                                                </Text>
                                            )
                                        }
                                    </View>
                                </View>




                                <View>
                                    <View style={[clientProfileStyles.textContainer]}>
                                        <Ionicons name="phone-portrait-outline" size={20} color="black" />
                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='Phone Number(07xxxx)'
                                            inputMode='numeric'
                                            value={values.phone_number}
                                            onChangeText={handleChange('phone_number')}
                                            onBlur={() => setFieldTouched('phone_number')}
                                            style={[clientProfileStyles.textInput, { width: 320 }]}
                                        />
                                    </View>

                                    {
                                        touched.phone_number && errors.phone_number && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.phone_number}
                                            </Text>
                                        )
                                    }
                                </View>

                                <View style={{ width: '100%' }}>
                                    <View style={[clientProfileStyles.textContainer, { width: '100%' }]}>
                                        <Ionicons name="location-outline" size={20} color="black" />
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
                                            handleChange={(value) => setFieldValue('location_attributes', value)}
                                            searchPlaceHolder='Search for a Location'
                                            task={false}
                                            name='location'
                                            buttonStyle={{ width: 330, height: 60, backgroundColor: Colors.light, borderColor: Colors.secondary, borderBottomWidth: 1 }}
                                        />

                                    </View>
                                    {
                                        touched.location_attributes && errors.location_attributes && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.location_attributes}
                                            </Text>
                                        )
                                    }
                                </View>
                                <Pressable
                                    disabled={!isValid}
                                    onPress={() => handleSubmit()}
                                    style={[defaultStyles.authButton,
                                    {
                                        width: 350,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
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

export default ClientProfile