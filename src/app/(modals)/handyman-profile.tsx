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
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useProfileUpload } from '@/hooks/useProfileUpload'
import { useAuth } from '@/contexts/AuthContext'


const HandymanProfile = () => {
    const { loading, error, handyman, visible, setVisible } = useHandymanFetcher()
    const { handleSubmit, setAlertVisible, isLoading, alertVisible, } = useHandymanUpdate()
    const {locations} = useLocation()
    const services = useService()
    const { pickImage } = useProfileUpload()
    const { userState } = useAuth()

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
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60,
                                        marginBottom: 20,
                                        marginTop: 1
                                    }}
                                    placeholder={require('@/assets/images/placeholder.jpg')}
                                    placeholderContentFit='cover'
                                    source={{ uri: userState?.avatar_url! }} />
                                <Pressable style={HandymanProfileStyles.cameraContainer} onPress={() => {
                                    pickImage()
                                }}>
                                    <Ionicons name='camera' color={Colors.lighter} size={20} />
                                </Pressable>
                            </View>
                            <ScrollView
                                contentContainerStyle={HandymanProfileStyles.contentContainer}
                                style={HandymanProfileStyles.scroll}>
                                <View style={HandymanProfileStyles.subContainer}>
                                    <View style={HandymanProfileStyles.textContainer}>


                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='First Name'
                                            value={values.first_name!}
                                            onChangeText={handleChange('first_name')}
                                            onBlur={() => setFieldTouched('first_name')}
                                            style={[HandymanProfileStyles.textInput]}
                                        />
                                    </View>

                                    {
                                        touched.first_name && errors.first_name && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.first_name}
                                            </Text>
                                        )
                                    }

                                    <View style={HandymanProfileStyles.textContainer}>

                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='Last Name'
                                            value={values.last_name!}
                                            onChangeText={handleChange('last_name')}
                                            onBlur={() => setFieldTouched('last_name')}
                                            style={[HandymanProfileStyles.textInput]}
                                        />
                                    </View>


                                    {
                                        touched.last_name && errors.last_name && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.last_name}
                                            </Text>
                                        )
                                    }
                                    <View style={HandymanProfileStyles.textContainer}>


                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='Title (e.g Carpenter)'
                                            value={values.title!}
                                            onChangeText={handleChange('title')}
                                            onBlur={() => setFieldTouched('title')}
                                            style={[HandymanProfileStyles.textInput]}
                                        />
                                    </View>


                                    {
                                        touched.title && errors.title && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.title}
                                            </Text>
                                        )
                                    }

                                    <View style={HandymanProfileStyles.textContainer}>

                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='Phone number (e.g 07xxxx)'
                                            inputMode='numeric'
                                            value={values.phone_number!}
                                            onChangeText={handleChange('phone_number')}
                                            onBlur={() => setFieldTouched('phone_number')}
                                            style={[HandymanProfileStyles.textInput]}
                                        />
                                    </View>

                                    {
                                        touched.phone_number && errors.phone_number && (
                                            <Text style={[defaultStyles.errorText]}>
                                                {errors.phone_number}
                                            </Text>
                                        )
                                    }

                                    <View style={[HandymanProfileStyles.textContainer]}>
                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder='year of  Experience (e.g 1)'
                                            value={values.year_of_experience?.toString()}
                                            onChangeText={handleChange('year_of_experience')}
                                            onBlur={() => setFieldTouched('year_of_experience')}
                                            style={[HandymanProfileStyles.textInput]}
                                        />

                                    </View>

                                    <View>
                                        <TextInput
                                            autoCapitalize='none'
                                            multiline
                                            numberOfLines={10}
                                            value={values.description!}
                                            onChangeText={handleChange('description')}
                                            onBlur={() => setFieldTouched('description')}
                                            placeholder='Description(e.g I am a plumber .. '
                                            style={[HandymanProfileStyles.textInput, HandymanProfileStyles.textArea]}
                                        />
                                        {
                                            touched.description && errors.description && (
                                                <Text style={[defaultStyles.errorText]}>
                                                    {errors.description}
                                                </Text>
                                            )
                                        }
                                    </View>

                                    <View>
                                        <TextInput
                                            autoCapitalize='none'
                                            multiline
                                            numberOfLines={10}
                                            value={values.handyman_skills!.toString()}
                                            onChangeText={handleChange('handyman_skills')}
                                            onBlur={() => setFieldTouched('handyman_skills')}
                                            placeholder='Task Responsibilities e.g(cleaning, house arrangement) '
                                            style={[HandymanProfileStyles.textInput, HandymanProfileStyles.textArea]}
                                        />
                                    </View>


                                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View>
                                            <Select
                                                data={services || []}
                                                searchPlaceHolder='Search for a service'
                                                handleChange={(value) => setFieldValue('service', value)}
                                                defaultButtonText={services.find(service => service.key === parseInt(values.service!))?.label || 'Service'}
                                                task={false}
                                                name='service'
                                                buttonStyle={HandymanProfileStyles.selectBtnStyles}
                                            />
                                            {
                                                touched.service && errors.service && (
                                                    <Text style={[defaultStyles.errorText]}>
                                                        {errors.service}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                        <View >
                                            <Select
                                                data={locations?.length > 0 &&
                                                    locations !== undefined &&
                                                    locations?.map(location => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                                                defaultButtonText={values.location_attributes! || 'Location'}
                                                handleChange={(value) => setFieldValue('location_attributes', value)}
                                                searchPlaceHolder='Search for a Location'
                                                task={false}
                                                name='location'
                                                buttonStyle={HandymanProfileStyles.selectBtnStyles}
                                            />
                                        </View>
                                    </View>

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
