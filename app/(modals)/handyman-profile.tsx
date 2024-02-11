import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import Colors from '@/constants/Colors'
import { HandymanProfileStyles, defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { Image } from 'expo-image'
import { Formik, } from 'formik'
import { handymanSchema } from '@/constants/validation-schema'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { useHandymanFetcher, useHandymanUpdate } from '@/hooks/useHandyman'
import { FontAwesome5 } from '@expo/vector-icons'


const HandymanProfile = () => {
    const { loading, error, handyman, visible, setVisible } = useHandymanFetcher()
    const { handleSubmit, setAlertVisible, isLoading, alertVisible, image, } = useHandymanUpdate()
    const locations = useLocation()
    const services = useService()

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
                                <FontAwesome5 name="camera" color={Colors.secondary} size={24} />
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
                                        task={false}
                                    />
                                    {
                                        touched.service && errors.service && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.service}
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
                                        placeholder='year of  Experience (e.g 1)'
                                        value={values.year_of_experience?.toString()}
                                        onChangeText={handleChange('year_of_experience')}
                                        onBlur={() => setFieldTouched('year_of_experience')}
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
                                        task={false}
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
                                            { backgroundColor: isValid ? Colors.primary : '#a5c9ca' }
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

                                <CustomAlert
                                    visible={visible}
                                    message={error}
                                    onClose={() => {
                                        setAlertVisible(false)
                                        setVisible(false)
                                    }}
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
export default HandymanProfile;
