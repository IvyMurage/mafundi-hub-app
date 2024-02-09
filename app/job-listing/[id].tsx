import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { useTaskFetch } from '@/hooks/useTaskProfile'
import Loader from '@/components/loader'

const Job = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { task, loading } = useTaskFetch(id)
    console.log(task)
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
                <Animated.View entering={FadeInRight}>

                </Animated.View>
            </SafeAreaView>
            <Loader isLoading={loading} />
        </>


    )
}

const jobStyle = StyleSheet.create({

})

export default Job