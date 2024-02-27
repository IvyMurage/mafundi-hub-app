import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import Colors from '@/constants/Colors'
import { ClientRegisterStyles, defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { Image } from 'expo-image'
import { useLocation } from '@/hooks/useLocation'
import { Formik } from 'formik'
import { stringfy } from '@/utils/stringify'
import { clientSchema } from '@/constants/validation-schema'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { useClient, useClientPost } from '@/hooks/useClient'



const ClientRegister = () => {
    const locations = useLocation()
    const { user: client, } = useClient()
    const { handleSubmit, error, alertVisible, setAlertVisible, isLoading, errorMessage } = useClientPost()

    return (
        <Formik
            initialValues={client}
            onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
            validationSchema={clientSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue }) => (
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
                    <View style={{
                        alignItems: 'center',
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: Colors.primary
                    }}>
                        <Image
                            style={{ width: 200, height: 100, resizeMode: 'contain' }}
                            source={require('@/assets/images/client.svg')}
                        />
                        <View style={ClientRegisterStyles.titleContainer}>
                            <Text style={ClientRegisterStyles.titleText}>
                                Join Mafundi Hub: Your client Solution! Register Now!
                            </Text>
                        </View>
                    </View>
                    <View style={ClientRegisterStyles.container}>
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
                                    task={false}
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



export default ClientRegister

