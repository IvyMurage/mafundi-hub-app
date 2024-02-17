import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable } from 'react-native'
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
        <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: Colors.primary }}>
            <FontAwesome5
                name='arrow-left'
                size={24} color={Colors.lighter}
                onPress={() => { router.back() }}
                style={{ paddingLeft: 20, marginVertical: 10 }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@/assets/images/calendar.svg')} style={{ width: 200, height: 200 }} contentFit='contain' />
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.lighter,
                        fontFamily: 'roboto-medium',
                        fontWeight: 'bold',
                        letterSpacing: 1.2,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}>
                    Book an Appointment
                </Text>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.light,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingBottom: 20
                }} showsVerticalScrollIndicator={false}
                >
                    <View style={{
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

                    }}>
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
                    <View style={{ marginBottom: 100, width: '100%', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingHorizontal: 20
                        }}>
                            <TextInput
                                placeholder='Task duration'
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.primary,
                                    marginVertical: 10,
                                    padding: 10,
                                    width: '40%',
                                    letterSpacing: 1.2
                                }}
                            />

                            <TextInput
                                placeholder='Task Time'
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.primary,
                                    marginVertical: 10,
                                    padding: 10,
                                    width: '40%',
                                    letterSpacing: 1.2
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingHorizontal: 20
                        }}>
                            <TextInput
                                placeholder='Enter Phone number(07xxxx)'
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.primary,
                                    marginVertical: 10,
                                    padding: 10,
                                    width: '40%',
                                    letterSpacing: 1.2
                                }}
                            />
                            <TextInput
                                placeholder='Enter Amount'
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.primary,
                                    marginVertical: 10,
                                    padding: 10,
                                    width: '40%',
                                    letterSpacing: 1.2
                                }}
                            />
                        </View>

                        <TextInput
                            placeholder='Appointment Notes'
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.primary,
                                // marginVertical: 10,
                                paddingHorizontal: 10,
                                marginHorizontal: 20,
                                letterSpacing: 1.2
                            }}
                            multiline
                            numberOfLines={6}
                        />

                        <View style={{
                            paddingHorizontal: 20,
                            marginVertical: 10,
                            width: '100%',
                            justifyContent: 'space-between'

                        }}>


                            <Pressable style={{
                                backgroundColor: Colors.secondary,
                                padding: 20,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 10
                            }}>
                                <Text style={{
                                    color: Colors.lighter,
                                    fontFamily: 'roboto-medium',
                                    fontWeight: 'bold',
                                    letterSpacing: 1.2
                                }}>
                                    Lipa na Mpesa
                                </Text>
                            </Pressable>
                            <Pressable style={{
                                backgroundColor: Colors.primary,
                                padding: 20,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 10

                            }}>
                                <Text style={{
                                    color: Colors.lighter,
                                    fontFamily: 'roboto-medium',
                                    fontWeight: 'bold',
                                    letterSpacing: 1.2
                                }}>
                                    Confirm and Chat
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default AppointmentForm