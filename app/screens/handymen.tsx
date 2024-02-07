import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultJobStyles } from '@/constants/styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Search from '@/components/search'
import { HandymanProvider, useHandyman } from '@/context/HandymanContext'
import Loader from '@/components/loader'
import HandymanList from '@/components/handymanList'
import { SafeAreaView } from 'react-native-safe-area-context'

const Handymen = () => {
    const { loading } = useHandyman()
    const handleChange = () => {
        console.log('searching...')
    }
    return (
        <HandymanProvider>
            <SafeAreaView style={{ flex: 1, paddingTop: 12, backgroundColor: Colors.light }}>
                <View style={{
                    ...handymenStyle.container,

                }}>

                    <View style={defaultJobStyles.headerStyle}>
                        <Image source={require('@/assets/images/placeholder.jpg')}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Text style={{
                            fontFamily: 'poppins-medium',
                            letterSpacing: 1.2,
                            fontSize: 16
                        }}>Plumbing</Text>
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
                            fontFamily: 'poppins-semibold',
                            letterSpacing: 1.2,
                            fontSize: 16,
                            paddingHorizontal: 16
                        }}>Best Plumbers in the</Text>
                        <Text style={{
                            fontFamily: 'poppins-semibold',
                            letterSpacing: 1.2,
                            fontSize: 16,
                            paddingHorizontal: 16
                        }}>Community</Text>
                    </View>
                    <View>
                        <Search handleChange={handleChange} placeholder='Search for Handyman' />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'poppins-semibold',
                            letterSpacing: 1.2,
                            fontSize: 15,
                            paddingHorizontal: 16

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
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})
export default Handymen