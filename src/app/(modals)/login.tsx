import { View, Text, TextInput, Pressable, SafeAreaView, } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { Formik } from 'formik'
import { loginSchema } from '@/constants/validation-schema'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { FontAwesome, } from '@expo/vector-icons'
import Divider from '@/components/divider'

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
                    <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: Colors.primary }}>
                        <View style={[defaultStyles.container]}>
                            <View>
                                <Image
                                    style={{ width: 300, height: 200 }}
                                    source={require('@/assets/images/auth-image.svg')}
                                />

                            </View>
                            <Divider />


                            <Text style={[defaultStyles.loginSubHeader]}>Login</Text>
                            <Text style={[defaultStyles.loginHeader]}>Please sign in to continue</Text>

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
                                <Text style={[defaultStyles.authButtonText]}>LOGIN</Text>
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