import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Job = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Job</Text>
        </View>
    )
}

export default Job