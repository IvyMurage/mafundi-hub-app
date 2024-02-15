import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'

const AppointmentForm = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingTop: 20,
            backgroundColor: Colors.primary
        }}>
            <View>
                <Image source={require('@/assets/images/calendar.svg')} style={{ width: 200, height: 200 }} />
                <Text>Book an Appointment</Text>

                <View>

                </View>
            </View>
        </SafeAreaView>

    )
}

export default AppointmentForm