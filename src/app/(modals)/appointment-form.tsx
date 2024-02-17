import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import CalendarPicker from 'react-native-calendar-picker'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AppointmentForm = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={appointmentStyles.container}>
            <FontAwesome5
                name='arrow-left'
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
                            <Pressable style={[appointmentStyles.button, { backgroundColor: Colors.primary }]}>
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
const appointmentStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: Colors.primary
    },
    icon: {
        paddingLeft: 20,
        marginVertical: 10
    },
    image: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 16,
        color: Colors.lighter,
        fontFamily: 'roboto-medium',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        marginVertical: 10
    },
    scrollView: {
        width: '100%'
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    calendarContainer: {
        backgroundColor: Colors.lighter,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        marginVertical: 10,
        padding: 10,
        width: '45%',
        letterSpacing: 1.2
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    buttonTitle: {
        color: Colors.lighter,
        fontFamily: 'roboto-medium',
        fontWeight: 'bold',
        letterSpacing: 1.2
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    textArea: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        marginVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        letterSpacing: 1.2
    },
    inputContainter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    },
    textContainer: {
        marginBottom: 150,
        width: '100%',
        justifyContent: 'space-between'
    }

})
export default AppointmentForm