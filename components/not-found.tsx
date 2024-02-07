import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const NotFound = () => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image source={require('@/assets/images/sorry.svg')} style={{ width: 300, height: 300 }} />
            <Text style={{ fontFamily: 'poppins-medium', letterSpacing: 1.2, fontSize: 16, textAlign: 'center' }}>
                No Tasks Found
            </Text>
        </View>
    )
}

export default NotFound