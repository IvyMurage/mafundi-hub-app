import { View, Text, TextInput, Pressable, SafeAreaView, StyleSheet, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { Formik, FormikHelpers } from 'formik'
import { loginSchema } from '@/constants/validation-schema'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { FontAwesome, } from '@expo/vector-icons'
import Divider from '@/components/divider'
import { Bounce } from 'react-native-animated-spinkit'
import AuthLoad from '@/components/auth-load'

const Login = () => {
    const { onLogin, isLoading, } = useAuth()
    const [user] = useState<{ email: string | null, password: string | null }>({
        email: '',
        password: ''
    })
    const [alertVisible, setAlertVisible] = useState(false);
    const [error, setError] = useState(false)

    const handleLogin = async (user: { email: string | null; password: string | null }, resetForm: FormikHelpers<{ email: string | null; password: string | null }>) => {
        try {
            const response = await onLogin!(user)
            if (response.ok) {
                resetForm.resetForm()
                setAlertVisible(true)
            }

        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }
    return (
        <>
            <Formik
                initialValues={user}
                onSubmit={(values, resetForm) => handleLogin(values, resetForm)}
                validationSchema={loginSchema}
            >
                {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, resetForm }) => (
                    <>
                        <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 10, backgroundColor: Colors.primary }}>
                            <View style={[defaultStyles.container]}>
                                <View style={{ marginTop: 10 }}>
                                    <Image
                                        style={{ width: 250, height: 200 }}
                                        source={require("@/assets/images/auth-image.svg")}
                                    />
                                </View>
                                <Divider />

                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={[defaultStyles.loginSubHeader]}>Login</Text>
                                    <Text style={[defaultStyles.loginHeader]}>Please sign in to continue</Text>
                                </View>

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
                                    <FontAwesome name='lock' size={24} color={Colors.primary} style={defaultStyles.authIcon} />

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
                                <Pressable
                                    disabled={!isValid}
                                    onPress={() => handleSubmit()}
                                    style={
                                        [defaultStyles.authButton,
                                        { backgroundColor: isValid ? Colors.secondary : '#a5c9ca' }
                                        ]
                                    }>
                                    {/* {isLoading && <ActivityIndicator size="small" color="white" />} */}
                                    <Text style={[defaultStyles.authButtonText]}>LOGIN</Text>
                                </Pressable>

                                <Text style={[defaultStyles.authOption]}>
                                    Don't Have an account?
                                    <Link href='/(auth)/sign-up'>
                                        <Text style={{ color: Colors.secondary, fontWeight: '700' }}>
                                            Sign Up
                                        </Text>
                                    </Link>
                                </Text>

                                <CustomAlert
                                    visible={error}
                                    message="Invalid email or password. Please try again"
                                    onClose={() => {
                                        setError(false)
                                    }}
                                />
                            </View>
                        </SafeAreaView>
                        <AuthLoad isLoading={isLoading!} />
                    </>
                )}
            </Formik>
        </>
    )
}

export default Login