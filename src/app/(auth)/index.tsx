import { View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Bounce } from 'react-native-animated-spinkit'

export default function Page() {
    return (
        <View style={{ backgroundColor: Colors.primary, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Bounce size={48} animating color={Colors.secondary} />
        </View>
    )
}

