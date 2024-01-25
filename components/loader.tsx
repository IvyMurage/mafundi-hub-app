import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const Loader = () => {
    const { isLoading } = useAuth()
    return (
        isLoading &&
        (<View style={[StyleSheet.absoluteFill, {
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center'
        }]}>
            <ActivityIndicator color={"#fff"} animating size='large' />
        </View>)
    )
}

export default Loader