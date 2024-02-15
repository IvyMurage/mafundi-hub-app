import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { defaultJobStyles } from '@/constants/styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Search from '@/components/search'
import { HandymanProvider, useHandyman } from '@/context/HandymanContext'
import Loader from '@/components/loader'
import HandymanList from '@/components/handymanList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getItemAsync } from 'expo-secure-store'
import { useService } from '@/hooks/useService'
import Divider from '@/components/divider'
import {LocationFilter} from '@/components/filter'
import { useAuth } from '@/context/AuthContext'

const Handymen = () => {
    const { loading } = useHandyman()
    const [service, setService] = useState<string>('Handyman Service')
    const services = useService()
    const [location, setLocation] = useState('')
    const [visible, setVisible] = useState(false)
    const { userState } = useAuth()
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

                    <View style={defaultJobStyles.headerStyle}>
                        <Image source={{ uri: userState?.avatar_url! } || require('@/assets/images/placeholder.jpg')}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.4,
                            fontSize: 16,
                            color: Colors.secondary
                        }}>{service}</Text>
                        <FontAwesome5
                            name="bell"
                            size={20}
                            color={Colors.secondary}
                        />
                    </View>
                    <View style={{
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.2,
                            fontSize: 16,
                            paddingHorizontal: 16,
                            color: Colors.primary
                        }}>Best Plumbers in the</Text>
                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.2,
                            fontSize: 16,
                            paddingHorizontal: 16,
                            color: Colors.primary

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
                        />

                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'roboto-medium',
                            letterSpacing: 1.2,
                            fontSize: 15,
                            paddingHorizontal: 16,
                            color: Colors.primary,
                            paddingTop: 20
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