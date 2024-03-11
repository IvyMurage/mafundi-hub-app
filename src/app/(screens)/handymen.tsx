import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultJobStyles } from '@/constants/styles'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Search from '@/components/search'
import { HandymanProvider, useHandyman } from '@/contexts/HandymanContext'
import Loader from '@/components/loader'
import HandymanList from '@/components/handymanList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getItemAsync } from 'expo-secure-store'
import { useService } from '@/hooks/useService'
import Divider from '@/components/divider'
import { LocationFilter } from '@/components/locationFilter'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'

const Handymen = () => {
    const { loading } = useHandyman()
    const [service, setService] = useState<string>('Handyman Service')
    const services = useService()
    const [location, setLocation] = useState('')
    const [visible, setVisible] = useState(false)
    const { userState } = useAuth()
    const router = useRouter()
    const handleChange = () => {
        console.log('searching...')
    }

    const getService = async () => {
        const service_id = await getItemAsync('service_id')
        const service = services.find((service) => service.value === service_id)
        setService(service?.label!)
    }
    useEffect(() => {
        getService()
    }, [])

    // console.log("Service", service)
    return (
        <HandymanProvider>
            <SafeAreaView style={{ flex: 1, paddingTop: 12, backgroundColor: Colors.light }}>
                <View style={{
                    ...handymenStyle.container,

                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 10,
                    }}>
                        <Ionicons name='arrow-back' size={20} color={Colors.primary} style={{
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }}
                            onPress={() => {
                                router.back()
                            }}
                        />

                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.4,
                            fontSize: 20,
                            color: Colors.secondary,
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}>{service}</Text>

                        <Image source={{ uri: userState?.avatar_url! } || require('@/assets/images/placeholder.jpg')}
                            style={{ width: 40, height: 40, borderRadius: 40 }} />
                    </View>

                    <View style={{
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontFamily: 'roboto-bold',
                            letterSpacing: 1.4,
                            fontSize: 24,
                            paddingHorizontal: 16,
                            color: Colors.primary
                        }}>Best Handymen in the</Text>
                        <Text style={{
                            fontFamily: 'roboto-bold',
                            letterSpacing: 1.4,
                            fontSize: 24,
                            paddingHorizontal: 16,
                            color: Colors.secondary

                        }}>Community</Text>
                    </View>
                    <View >

                        <Search handleChange={handleChange} placeholder='Search for Handyman' />
                        <Divider />
                        <Pressable style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'flex-end',
                            position: 'relative',
                            bottom: 52,
                        }} onPress={() => {
                            setVisible(!visible)
                        }}>
                            <FontAwesome5
                                name='filter'
                                size={20}
                                color={Colors.primary}
                                style={[
                                    {
                                        paddingHorizontal: 40,
                                    }, visible && {
                                        transform: [{ rotate: '-90deg' }]
                                    }]} />
                            {/* 'Filter' */}
                        </Pressable>
                        <LocationFilter
                            setLocation={setLocation}
                            visible={visible}
                            setVisible={() => { }}
                        />

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 10,

                    }}>
                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.2,
                            fontSize: 20,
                            paddingHorizontal: 10,
                            color: Colors.primary,

                        }}>Recommended</Text>

                        <HandymanList />

                    </View>
                </View>
            </SafeAreaView>
            <Loader isLoading={loading!} />
        </HandymanProvider>
    )
}



const handymenStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})
export default Handymen