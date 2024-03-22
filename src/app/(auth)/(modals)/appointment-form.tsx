import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { useAuth } from '@/contexts/AuthContext'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import CalendarPicker from 'react-native-calendar-picker'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { appointmentStyles } from '@/constants/styles'
import { setItemAsync } from 'expo-secure-store'
import { Formik } from 'formik'
import { useTaskId } from '@/contexts/TaskIdContext'


type AppointmentFormProps = {
    handyman_id: number | null;
    task_id: number | null;
    appointment_notes: string | null;
    duration: number | null;
    client_id: number | null;
    appointment_date: Date | null;
    appointment_time: string | null;
    appointment_status: string | null;
    job_proposal_id: string | null;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AppointmentForm = () => {
    const router = useRouter()

    const { handymanId } = useHandymanId()
    const { taskId, proposalId } = useTaskId()
    const { userState, authState } = useAuth()
    const [loading, setLoading] = useState(false)
    const [appointment, setAppointment] = useState<AppointmentFormProps>({
        handyman_id: parseInt(handymanId!),
        task_id: parseInt(taskId!),
        appointment_notes: '',
        duration: 0,
        client_id: userState?.user_id!,
        appointment_date: new Date(),
        appointment_time: '',
        appointment_status: "scheduled",
        job_proposal_id: proposalId!
    })
    const [payment, setPayment] = useState({
        phone_number: '',
        amount: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [paymentResponse, setPaymentResponse] = useState('')
    const [paymentError, setPaymentError] = useState('')


    const chatExists = async () => {
        try {
            setLoading(true)
            if (userState?.user_role === "client") {
                const chatRef = collection(FIREBASE_DB, 'messages')
                const q = query(chatRef, where('handyman', '==', handymanId), where('client', '==', userState?.user_id?.toString()))
                const result = await getDocs(q)
                if (result.empty) {
                    return false
                }
                return true
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    const bookAppointment = async (values: AppointmentFormProps) => {

        try {
            setLoading(true)
            const payload = {
                ...values,
                duration: parseInt(values.duration!.toString()),
                appointment_date: new Date(values.appointment_date!).toISOString()
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/appointments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()
            if (response.ok) {
                createNewChat()
                router.push('/(auth)/(tabs)/messages')
            }

            if (!response.ok) {
                throw new Error(data?.error)
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    const createNewChat = async () => {
        const exist = await chatExists()
        if (exist) {
            return
        }
        try {
            setLoading(true)
            if (userState?.user_role === "client") {
                let id = `${Date.now()}`
                const _doc = {
                    id: id,
                    handyman: handymanId,
                    client: userState?.user_id?.toString(),
                    createdAt: serverTimestamp()
                }
                const docRef = await addDoc(collection(FIREBASE_DB, 'messages'), _doc)
                await setItemAsync('docRefId', docRef.id)
                userState.user_role === 'client' && await setItemAsync('client_id', JSON.stringify(userState?.user_id))
                setLoading(false)
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }


    const stkPushQuery = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/stkpushquery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify({
                    checkout_request_id: paymentResponse
                })
            })
            const data = await response.json()
            if (response.ok) {
                console.log('dataaaa', data)
            }

            if (!response.ok) {
                setPaymentError(data?.errorMessage)
            }
        }
        catch (e: any) {
            Alert.alert('Error', paymentError)
        }
        finally {
            setIsLoading(false)
        }
    }
    const makePayment = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/stkpush`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify({
                    amount: payment.amount,
                    phone_number: payment.phone_number,
                })
            })

            const data = await response.json()
            console.log(response)
            console.log('data', data)
            if (response.ok) {
                setPaymentResponse(data?.success?.CheckoutRequestID)

                if (paymentResponse !== '') {
                    stkPushQuery()
                }
            }

        }
        catch (e: any) {
            Alert.alert('Something went wrong. Try Again')
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Formik
            initialValues={appointment}
            onSubmit={(values) => {
                bookAppointment(values)
            }}
        >
            {({ values, errors, touched, setFieldTouched, isValid, handleChange, handleSubmit, setFieldValue }) => (
                <SafeAreaView style={appointmentStyles.container}>
                    <Ionicons
                        name='arrow-back'
                        size={24} color={Colors.lighter}
                        onPress={() => { router.back() }}
                        style={appointmentStyles.icon} />

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('@/assets/images/calendar.svg')}
                            style={appointmentStyles.image}
                            contentFit='contain' />

                        <Text style={appointmentStyles.title}>
                            Book an Appointment
                        </Text>

                        <ScrollView
                            style={appointmentStyles.scrollView}
                            contentContainerStyle={appointmentStyles.scrollViewContent}
                            showsVerticalScrollIndicator={false}>
                            <View style={appointmentStyles.calendarContainer}>
                                <CalendarPicker
                                    onDateChange={(date) => { handleChange('appointment_date')(date.toString()) }}
                                    width={350}
                                    height={400}
                                    startFromMonday={true}
                                    minDate={new Date()}
                                    todayBackgroundColor={Colors.primary}
                                    todayTextStyle={{
                                        color: Colors.lighter,
                                        fontWeight: 'bold',
                                        fontFamily: 'roboto-medium',
                                        letterSpacing: 1.2
                                    }}
                                    selectedDayColor={Colors.primary}
                                    selectedDayTextColor={Colors.lighter}
                                    textStyle={{
                                        color: Colors.primary,
                                        fontWeight: 'bold',
                                        fontFamily: 'roboto-medium',
                                        letterSpacing: 1.2
                                    }}
                                />
                            </View>

                            <View style={appointmentStyles.textContainer}>
                                <View style={appointmentStyles.inputContainter}>
                                    <TextInput
                                        placeholder='Task duration'
                                        value={values.duration!.toString()}
                                        onChangeText={handleChange('duration')}
                                        onBlur={() => setFieldTouched('duration', true)}
                                        style={appointmentStyles.textInput}
                                    />

                                    <TextInput
                                        placeholder='Task Time'
                                        value={values.appointment_time!}
                                        onChangeText={handleChange('appointment_time')}
                                        onBlur={() => setFieldTouched('appointment_time', true)}
                                        style={appointmentStyles.textInput}
                                    />
                                </View>

                                <View style={appointmentStyles.inputContainter}>
                                    <TextInput
                                        placeholder='Phone number(07xx)'
                                        value={payment.phone_number}
                                        onChangeText={(text) => { setPayment({ ...payment, phone_number: text }) }}
                                        style={appointmentStyles.textInput}
                                    />
                                    <TextInput
                                        placeholder='Enter Amount'
                                        value={payment.amount.toString()}
                                        onChangeText={(text) => { setPayment({ ...payment, amount: text }) }}
                                        style={appointmentStyles.textInput}
                                    />
                                </View>

                                <TextInput
                                    placeholder='Appointment Notes'
                                    value={values.appointment_notes!}
                                    onChangeText={handleChange('appointment_notes')}
                                    onBlur={() => setFieldTouched('appointment_notes', true)}
                                    style={appointmentStyles.textArea}
                                    multiline
                                    numberOfLines={6}
                                />
                                <View style={appointmentStyles.buttonContainer}>
                                    <Pressable style={appointmentStyles.button} onPress={() => {
                                        makePayment()
                                    }}>
                                        {isLoading && <ActivityIndicator size="small" color="white" />}
                                        <Text style={appointmentStyles.buttonTitle}>
                                            Lipa na Mpesa
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        // disabled={paymentResponse === ''}
                                        style={[appointmentStyles.button, { backgroundColor: isValid && !paymentResponse ? Colors.primary : '#a5c9ca' }]} onPress={async () => {
                                            handleSubmit()
                                        }}>
                                        {loading && <ActivityIndicator size="small" color="white" />}
                                        <Text style={[appointmentStyles.buttonTitle,]}>
                                            Confirm and Chat
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            )}
        </Formik>
    );
}

export default AppointmentForm