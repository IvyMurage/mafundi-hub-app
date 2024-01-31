import { View, Text, TextInput, Pressable, SafeAreaView, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { Formik } from 'formik'
import { loginSchema } from '@/constants/loginSchema'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'

const Login = () => {
    const router = useRouter()
    const { onLogin, isLoading } = useAuth()
    const [user] = useState<{ email: string | null, password: string | null }>({
        email: '',
        password: ''
    })
    const [alertVisible, setAlertVisible] = useState(false);
    const [error, setError] = useState(false)

    const handleLogin = async (user: { email: string | null; password: string | null }) => {
        try {
            const response = await onLogin!(user)
            if (response.ok) {
                setAlertVisible(true)
            }

        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }
    return (
        <Formik
            initialValues={user}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={loginSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                <>
                    <SafeAreaView style={{ padding: 20, flex: 1, backgroundColor: Colors.primary }}>
                        <View style={[defaultStyles.container]}>
                            <Text style={[defaultStyles.loginHeader]}>Welcome Back!</Text>

                            <Image
                                style={{ width: 300, height: 200 }}
                                source={require('@/assets/images/auth-image.svg')}
                            />

                            <Text style={[defaultStyles.loginSubHeader]}>Login</Text>

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
                            <Pressable
                                disabled={!isValid}
                                onPress={() => handleSubmit()}
                                style={
                                    [defaultStyles.authButton,
                                    { backgroundColor: isValid ? Colors.secondary : '#a5c9ca' }
                                    ]
                                }>
                                <Text style={[defaultStyles.authButtonText]}>Login</Text>
                            </Pressable>

                            <Text style={[defaultStyles.authOption]}>
                                Don't Have an account?
                                <Link href={'/(modals)/sign-up'}>
                                    <Text style={{ color: Colors.secondary, fontWeight: '700' }}>
                                        Sign Up
                                    </Text>
                                </Link>
                            </Text>

                            <CustomAlert
                                visible={alertVisible}
                                message="You have successfully logged in"
                                onClose={() => {
                                    setAlertVisible(false)
                                    router.push('/(tabs)/')
                                }}
                            />

                            <CustomAlert
                                visible={error}
                                message="Invalid email or password. Please try again"
                                onClose={() => {
                                    setError(false)
                                }}
                            />
                        </View>
                    </SafeAreaView>
                    <Loader isLoading={isLoading!} />
                </>
            )}
        </Formik>
    )
}

export default Login