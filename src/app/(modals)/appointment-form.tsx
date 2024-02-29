import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { useAuth } from '@/contexts/AuthContext'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { addDoc, collection, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import CalendarPicker from 'react-native-calendar-picker'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { appointmentStyles } from '@/constants/styles'
import { setItemAsync } from 'expo-secure-store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AppointmentForm = () => {
    const router = useRouter()

    const [addChatGroup, setAddChatGroup] = useState("")
    const { handymanId } = useHandymanId()
    const { userState } = useAuth()
    const [loading, setLoading] = useState(false)

    const chatExists = async () => {
        try {
            setLoading(true)
            if (userState?.user_role === "client") {
                const chatRef = collection(FIREBASE_DB, 'messages')
                const q = query(chatRef, where('handyman', '==', handymanId), where('client', '==', userState?.user_id))
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
                    client: userState?.user_id,
                    createdAt: serverTimestamp()
                }
                const docRef = await addDoc(collection(FIREBASE_DB, 'messages'), _doc)
                await setItemAsync('docRefId', docRef.id)
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }



    return (
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
                            onDateChange={(date) => { console.log(date) }}
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
                                style={appointmentStyles.textInput}
                            />

                            <TextInput
                                placeholder='Task Time'
                                style={appointmentStyles.textInput}
                            />
                        </View>

                        <View style={appointmentStyles.inputContainter}>
                            <TextInput
                                placeholder='Phone number(07xx)'
                                style={appointmentStyles.textInput}
                            />
                            <TextInput
                                placeholder='Enter Amount'
                                style={appointmentStyles.textInput}
                            />
                        </View>

                        <TextInput
                            placeholder='Appointment Notes'
                            style={appointmentStyles.textArea}
                            multiline
                            numberOfLines={6}
                        />
                        <View style={appointmentStyles.buttonContainer}>
                            <Pressable style={appointmentStyles.button}>
                                <Text style={appointmentStyles.buttonTitle}>
                                    Lipa na Mpesa
                                </Text>
                            </Pressable>
                            <Pressable style={[appointmentStyles.button, { backgroundColor: Colors.primary }]} onPress={async () => {
                                createNewChat()
                                router.push('/(tabs)/messages')
                            }}>
                                <Text style={[appointmentStyles.buttonTitle,]}>
                                    Confirm and Chat
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    );
}

export default AppointmentForm