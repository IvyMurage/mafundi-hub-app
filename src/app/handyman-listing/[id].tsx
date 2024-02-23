import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { HandymanProps } from '@/types/handyman'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'

const Handyman = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { authState } = useAuth()
    const [loading, setLoading] = useState(false)
    const [handyman, setHandyman] = useState<HandymanProps>({} as HandymanProps)

    useEffect(() => {
        const getHandyman = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${id}/show`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                setHandyman(
                    {
                        ...data,
                        location_attributes: `${data.location?.city}, ${data.location?.county} `
                    }
                )
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoading(false)
            }
        }

        getHandyman()
    }, [])

    const handymanSkills = handyman.handyman_skills?.map((skill: string) => {
        return (
            <View key={skill} style={{
                paddingHorizontal: 40,
                paddingVertical: 10,
                backgroundColor: Colors.lighter,
                margin: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>

                <Text style={{
                    fontSize: 12,
                    letterSpacing: 1.2,
                    fontFamily: 'roboto-medium',
                }}>

                    {skill}
                </Text>
            </View>
        )
    })

    const workPictures = handyman.media_url?.map((picture: string, index) => {
        return (
            <View key={index} style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 10,
                width: 150,
                height: 100,

            }}>
                <Image source={{ uri: picture }} style={{
                    width: 150,
                    height: 100,
                    borderRadius: 10,
                }} contentFit='cover' />
            </View>
        )
    })

    return (
        <SafeAreaView style={{
            flex: 1, paddingTop: 10, backgroundColor: Colors.primary,
        }}>
            <Octicons name='arrow-left' size={20} color={Colors.lighter} style={{
                paddingHorizontal: 12,

            }}
                onPress={() => {
                    router.back()
                }} />
            <View style={{
                width: '100%',
                alignItems: 'center',
                top: 70,
                zIndex: 1,
            }}>
                <Image source={require('@/assets/images/placeholder.jpg')}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                        borderColor: Colors.secondary,
                        borderWidth: 1,
                    }} />
                <Octicons
                    name="dot-fill"
                    size={24}
                    color={handyman.availability ? 'green' : 'red'}
                    style={{
                        position: 'absolute',
                        right: '42%',
                        top: 30,
                        zIndex: 1
                    }}
                />
            </View>
            <ScrollView style={{
                width: '100%',
                height: '100%',
                marginTop: 60,
                backgroundColor: Colors.light,
            }} >
                <View style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}>
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            padding: 10,
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-bold',
                                paddingVertical: 5
                            }}>
                                {handyman.first_name} {handyman.last_name}
                            </Text>

                            <Text style={{
                                fontSize: 12,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-medium',
                                paddingVertical: 5

                            }}>
                                {handyman.title}
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-medium',
                                paddingVertical: 5
                            }}>
                                {handyman.location_attributes}
                            </Text>
                        </View>

                        <Pressable style={{
                            width: '50%',
                            alignItems: 'center',
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: Colors.primary,
                            marginTop: 10
                        }} onPress={() => {
                            router.push(`/appointment-form`)
                        }}>

                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-bold',
                                color: Colors.lighter
                            }}>Book Appointment</Text>
                        </Pressable>

                        <ScrollView horizontal contentContainerStyle={{
                            marginTop: 10,

                        }}>
                            {handymanSkills}
                        </ScrollView>

                        <View style={{
                            width: '100%',
                            padding: 10,
                            alignSelf: 'flex-start'
                        }}>
                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-bold',
                            }}>Bio</Text>

                            <Text style={{
                                fontSize: 12,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto',

                            }}>{handyman.description}</Text>
                        </View>

                        <ScrollView horizontal style={{
                            alignSelf: 'flex-start',
                            padding: 10
                        }} contentContainerStyle={{
                            marginTop: 10,
                            flexDirection: 'column',
                            justifyContent: 'space-between',

                        }}>
                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-bold',
                                marginBottom: 10

                            }}>Images</Text>

                            {workPictures}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Handyman