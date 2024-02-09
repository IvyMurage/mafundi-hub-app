import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { useTaskFetch } from '@/hooks/useTaskProfile'
import Loader from '@/components/loader'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'

const Job = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { task, loading } = useTaskFetch(id)
    console.log(task)
    return (
        <>
            <View >
                <Image
                    source={require('@/assets/images/handyman.jpg')}
                    style={{ width: '100%', height: 200 }}
                    contentFit="cover"

                />
                <View style={jobStyle.overlay} />
            </View>
            <SafeAreaView style={jobStyle.safeStyle}>
                <Animated.View entering={FadeInRight}>
                    <FontAwesome5 name="arrow-left" color={Colors.lighter} size={20} />
                    <View style={jobStyle.header} >
                        <Text style={jobStyle.title}>{task.job_title}</Text>
                        <Text style={jobStyle.service}>{task.service_name}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <MaterialIcons name="location-pin" size={16} color={Colors.lighter} />
                            <Text style={jobStyle.location}>{task.task_location}</Text>
                        </View>
                    </View>
                </Animated.View>
            </SafeAreaView>
            <Loader isLoading={loading} />
        </>


    )
}

const jobStyle = StyleSheet.create({
    safeStyle: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
        position: 'absolute'

    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0,
        paddingVertical: 10,
        width: '100%',
        left: '50%',
        height: 150,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    title: {
        fontSize: 20,
        paddingVertical: 10,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.8,
        color: Colors.lighter,
        textAlign: 'center'
    },
    service: {
        fontSize: 16,
        fontFamily: 'roboto-medium',
        letterSpacing: 1.8,
        color: Colors.lighter,
        textAlign: 'center'

    },

    location: {
        fontSize: 12,
        fontFamily: 'roboto-light',
        letterSpacing: 1.8,
        color: Colors.lighter,
        textAlign: 'center',
        marginLeft: 5
    }
})

export default Job