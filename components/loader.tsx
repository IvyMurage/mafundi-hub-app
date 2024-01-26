import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const Loader = () => {
    const { isLoading } = useAuth()
    return (
        isLoading &&
        (<View style={[StyleSheet.absoluteFill, {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }]}>
            <ActivityIndicator color={"#fff"} animating size='large' />
        </View>)
    )
}

export default Loader