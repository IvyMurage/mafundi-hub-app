import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { HandymanProps, HandymanType } from '@/types/handyman'

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
            <View key={skill}>
                <Text>
                    {skill}
                </Text>
            </View>
        )
    })

    const workPictures = handyman.media_url?.map((picture: string, index) => {
        return (
            <View key={index}>
                <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
            </View>
        )
    })
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
            <ScrollView>
                <View style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                }}>
                    <View>
                        <Image source={require('@/assets/images/placeholder.jpg')} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </View>

                    <View>
                        <View>
                            <Text>
                                {handyman.first_name} {handyman.last_name}
                            </Text>

                            <Text>
                                {handyman.title}
                            </Text>
                            <Text>
                                {handyman.location_attributes}
                            </Text>
                        </View>

                        <Pressable>
                            <Text>Book Appointment</Text>
                        </Pressable>

                        <ScrollView horizontal>
                            {handymanSkills}
                        </ScrollView>

                        <View>
                            <Text>Bio</Text>

                            <Text>{handyman.description}</Text>
                        </View>

                        <ScrollView horizontal>
                            <Text>Images</Text>
                            {workPictures}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Handyman