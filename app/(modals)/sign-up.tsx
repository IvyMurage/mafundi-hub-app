import { View, Text, TextInput, Pressable, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { Formik, FormikHelpers } from 'formik'
import { signUpSchema } from '@/constants/loginSchema'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'

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
                    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: Colors.primary }}>
                        <View style={[defaultStyles.container]}>
                            <Text style={[defaultStyles.loginHeader]}>
                                Mafundi
                                <Text style={{ color: Colors.lighter }}>
                                    Hub
                                </Text>
                            </Text>
                            <Text style={{
                                fontFamily: 'poppins',
                                letterSpacing: 1.4,
                                color: Colors.lighter,
                                alignSelf: 'flex-start',
                                paddingLeft: 8,
                                position: 'absolute',
                                top: 100
                            }}>
                                Create Your account
                            </Text>

                            <TextInput
                                autoCapitalize='none'
                                placeholder='Email'
                                value={values.email!}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                style={[defaultStyles.inputTextField]}
                            />
                            {
                                touched.email && errors.email && (
                                    <Text style={[defaultStyles.errorText]}>
                                        {errors.email}
                                    </Text>
                                )
                            }
                            <TextInput
                                autoCapitalize='none'
                                secureTextEntry
                                placeholder='Password'
                                value={values.password!}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                style={[defaultStyles.inputTextField]}
                            />
                            {
                                touched.password && errors.password && (
                                    <Text style={[defaultStyles.errorText]}>
                                        {errors.password}
                                    </Text>
                                )
                            }
                            <TextInput
                                autoCapitalize='none'
                                secureTextEntry
                                placeholder='Confirm Password'
                                value={values.confirmation_password!}
                                onChangeText={handleChange('confirmation_password')}
                                onBlur={() => setFieldTouched('confirmation_password')}
                                style={[defaultStyles.inputTextField]}
                            />
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
                                <Link href={'/(modals)/login'}>
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

export default SignUp