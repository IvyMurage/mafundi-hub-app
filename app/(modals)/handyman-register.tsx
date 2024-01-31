import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native'
import Colors from '@/constants/Colors'
import { defaultStyles, handymanRegisterStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { Formik } from 'formik'
import { handymanSchema } from '@/constants/loginSchema'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { useHandyman, useHandymanPost } from '@/hooks/useHandyman'

const HandymanRegister = () => {
    const router = useRouter()
    const locations = useLocation()
    const services = useService()
    const { handyman } = useHandyman()
    const { handleSubmit, isLoading, alertVisible, setAlertVisible } = useHandymanPost()

    return (
        <Formik
            initialValues={handyman}
            onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
            validationSchema={handymanSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue, }) => (
                <>
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
                                        profile={false}
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
                                        value={values.year_of_experience!}
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
                                        profile={false}
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

                            <CustomAlert
                                visible={alertVisible}
                                message="You have successfully registered as a handyman"
                                onClose={() => {
                                    setAlertVisible(false)
                                    router.push('/(modals)/login')
                                }}
                            />
                        </View >
                    </SafeAreaView >
                    <Loader isLoading={isLoading} />
                </>
            )}
        </Formik >
    )
}



export default HandymanRegister;

