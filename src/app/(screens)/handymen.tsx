import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
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

    useEffect(() => {
        (
            async () => {
                const service_id = await getItemAsync('service_id')
                const service = services.find((service) => service.value === service_id)
                setService(service?.label!)
            }
        )()
    }, [services])

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
                    <View style={handymenStyle.filterOPtions}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexGrow: 1 }}><Search handleChange={handleChange} placeholder='Search for Handyman' /></View>
                            <Ionicons
                                name='filter'
                                size={20}
                                color={Colors.primary}
                                onPress={() => setVisible(!visible)}
                            />
                        </View>

                        <Divider />

                        <View style={{ borderWidth: 1, margin: 40 }}>
                            <LocationFilter
                                setLocation={setLocation}
                                visible={visible}
                                setVisible={setVisible}
                            />
                        </View>
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
    },
    filterOPtions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    }
})
export default Handymen