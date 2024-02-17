import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
    const router = useRouter()
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
                    <FontAwesome5 name="arrow-left" color={Colors.lighter} size={20} onPress={() => {
                        router.back()
                    }} />
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
                    <ScrollView>
                        <View style={jobStyle.lowHeader}>
                            <Text style={jobStyle.lowHeaderText}>{task.job_price}</Text>
                            <Text style={jobStyle.lowHeaderText}>{task.duration_label}</Text>
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'roboto-medium',
                                letterSpacing: 1.8,
                                color: Colors.dark,
                                textAlign: 'left',
                                padding: 10
                            }}>Job Description</Text>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: 'roboto-light',
                                letterSpacing: 1.8,
                                color: Colors.dark,
                                textAlign: 'justify',
                                padding: 10
                            }}>{task.task_description}</Text>
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'roboto-medium',
                                letterSpacing: 1.8,
                                color: Colors.dark,
                                textAlign: 'left',
                                padding: 10
                            }}>Job Responsibilities</Text>
                            <View>
                                {task.task_responsibilities?.length === 0 ?
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: 'roboto-light',
                                        letterSpacing: 1.8,
                                        color: Colors.dark,
                                        textAlign: 'justify',
                                        padding: 10
                                    }}>No responsibilities</Text>
                                    :
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: 'roboto-light',
                                            letterSpacing: 1.8,
                                            color: Colors.dark,
                                            textAlign: 'justify',
                                            padding: 10
                                        }}>{`\u2022 ${task?.task_responsibilities?.map(item => {
                                            return item
                                        })}`}</Text>
                                    </View>
                                }
                            </View>
                        </View>

                        <View>
                            <Pressable style={
                                {
                                    backgroundColor: Colors.primary,
                                    width: '100%',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginVertical: 20
                                }}
                                onPress={() => {
                                    router.navigate('job-proposal-form')
                                }}
                            >
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: 'roboto-bold',
                                    letterSpacing: 1.8,
                                    color: Colors.lighter,
                                    textAlign: 'center',
                                    padding: 10
                                }}>Apply</Text>
                            </Pressable>
                        </View>
                    </ScrollView>


                </Animated.View>
            </SafeAreaView >
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
        width: '90%',
        height: 150,
    },
    lowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginTop: 10,
    },
    lowHeaderText: {
        fontSize: 12,
        fontFamily: 'roboto-medium',
        letterSpacing: 1.8,
        color: Colors.lighter,
        textAlign: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
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
        marginLeft: 5,
        marginBottom: 10
    }
})

export default Job