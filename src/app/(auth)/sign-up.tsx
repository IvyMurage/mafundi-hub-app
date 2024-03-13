import { View, Text, TextInput, Pressable, SafeAreaView, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { Formik, FormikHelpers } from 'formik'
import { signUpSchema } from '@/constants/validation-schema'
import { useAuth } from '@/contexts/AuthContext'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { FontAwesome, Octicons } from '@expo/vector-icons'

const SignUp = () => {
    const router = useRouter()
    const { onRegister, isLoading } = useAuth()
    const [user] = useState<{
        email: string | null;
        password: string | null;
        confirmation_password: string | null
    }>({
        email: '',
        password: '',
        confirmation_password: ''

    })

    const [alertVisible, setAlertVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (
        user: {
            email: string | null;
            password: string | null;
            confirmation_password: string | null
        }, resetForm: FormikHelpers<{ email: string | null; password: string | null; confirmation_password: string | null }>) => {
        setLoading(true)
        try {
            const response = await onRegister!(user)
            if (response.ok) {
                setAlertVisible(true)
                resetForm.resetForm()
                setLoading(false)
            }
        }
        catch (error: string | any) {
            setAlertVisible(true)
            setError(true)
            setErrorMessage(error?.message!)
        }
        finally {
            setLoading(false)
        }

    }


    return (
        <Formik
            initialValues={user}
            onSubmit={(values, resetForm) => handleSignUp(values, resetForm)}
            validationSchema={signUpSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, }) => (
                <>
                    <SafeAreaView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 10, backgroundColor: Colors.primary }}>
                        <Octicons name='arrow-left' size={24} color={Colors.lighter} style={styles.backArrow} onPress={() => { router.back() }} />
                        <View style={styles.container}>
                            <Text style={styles.containerTitle}>
                                Create Account
                            </Text>
                            <Text style={styles.containerSubTitle}>
                                Please fill the input below
                            </Text>
                        </View>
                        <View style={[defaultStyles.container]}>
                            <View style={[defaultStyles.textContainer]}>
                                <FontAwesome name='envelope-o' size={20} color={Colors.primary} style={defaultStyles.authIcon} />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Email'
                                    value={values.email!}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    style={[defaultStyles.inputTextField, defaultStyles.authInput]}
                                />
                            </View>

                            {
                                touched.email && errors.email && (
                                    <Text style={[defaultStyles.errorText]}>
                                        {errors.email}
                                    </Text>
                                )
                            }
                            <View style={[defaultStyles.textContainer]}>
                                <FontAwesome name='lock' size={20} color={Colors.primary} style={defaultStyles.authIcon} />
                                <TextInput
                                    autoCapitalize='none'
                                    secureTextEntry
                                    placeholder='Password'
                                    value={values.password!}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    style={[defaultStyles.inputTextField, defaultStyles.authInput]}
                                />
                            </View>

                            {
                                touched.password && errors.password && (
                                    <Text style={[defaultStyles.errorText]}>
                                        {errors.password}
                                    </Text>
                                )
                            }
                            <View style={defaultStyles.textContainer}>
                                <FontAwesome name='lock' size={20} color={Colors.primary} style={defaultStyles.authIcon} />
                                <TextInput
                                    autoCapitalize='none'
                                    secureTextEntry
                                    placeholder='Confirm Password'
                                    value={values.confirmation_password!}
                                    onChangeText={handleChange('confirmation_password')}
                                    onBlur={() => setFieldTouched('confirmation_password')}
                                    style={[defaultStyles.inputTextField, defaultStyles.authInput]}
                                />
                            </View>

                            {
                                touched.confirmation_password && errors.confirmation_password && (
                                    <Text style={[defaultStyles.errorText]}>
                                        {errors.confirmation_password}
                                    </Text>
                                )
                            }
                            <Pressable style={
                                [
                                    defaultStyles.authButton,
                                    { backgroundColor: isValid ? Colors.secondary : '#a5c9ca' }
                                ]}>
                                <Text
                                    disabled={!isValid}
                                    onPress={() => handleSubmit()}
                                    style={
                                        [defaultStyles.authButtonText]
                                    }>
                                    Sign Up
                                </Text>
                            </Pressable>

                            <Text style={[defaultStyles.authOption]}>
                                Already Have an account?
                                <Link href='/(auth)/login'>
                                    <Text style={{ color: Colors.secondary, fontWeight: '700' }}>
                                        Login
                                    </Text>
                                </Link>
                            </Text>

                            <CustomAlert
                                visible={alertVisible}
                                message="You have successfully Signed up"
                                onClose={() => {
                                    setAlertVisible(false)
                                    router.push('/(onboard)/register-option')
                                }}
                            />

                            {error && <CustomAlert
                                visible={alertVisible}
                                message={errorMessage}
                                onClose={() => {
                                    setAlertVisible(false)
                                    setError(false)
                                }}
                            />}
                        </View>
                    </SafeAreaView>
                    <Loader isLoading={loading!} />
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    backArrow: {
        marginTop: 18,
        marginLeft: 15
    },
    containerTitle: {
        fontFamily: 'roboto-bold',
        letterSpacing: 1.4,
        fontSize: 20,
        color: Colors.lighter,
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    containerSubTitle: {
        fontFamily: 'roboto',
        letterSpacing: 1.2,
        fontSize: 14,
        color: Colors.lighter,
        alignSelf: 'flex-start',
        paddingHorizontal: 5
    },
})

export default SignUp