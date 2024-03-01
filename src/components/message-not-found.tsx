import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const MessageNotFound = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Image source={require('@/assets/images/message.svg')} style={{ width: 300, height: 300 }} contentFit='cover' />
            <Text style={{ fontSize: 16, fontFamily: 'roboto-bold', letterSpacing: 1.6 }}>Oops No Messages Found!</Text>
        </View>
    )
}

export default MessageNotFound