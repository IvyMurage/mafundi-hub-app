import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { HandymanType } from '@/types/handyman'
import { useHandyman } from '@/contexts/HandymanContext'
import Colors from '@/constants/Colors'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'

const HandymanList = () => {
    const { handymen } = useHandyman()
    const { userState } = useAuth()
    const router = useRouter()

    const handlePress = (handymanId: number) => {
        if (userState?.user_role === 'client') {
            router.push(`/handyman-listing/${handymanId}`)
        }
    }
    const renderHandymen = ({ item }: { item: HandymanType }) => {
        return (
            <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
                <Pressable onPress={() => handlePress(item.id)}>
                    <View style={{
                        flex: 1,
                        width: 160,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.primary,
                        padding: 10,
                        margin: 10,
                        borderRadius: 10
                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.light,
                            width: '100%',
                            paddingHorizontal: 8
                        }}>
                            <Image source={{ uri: item.avatar_url }}
                                placeholder={require('@/assets/images/placeholder.jpg')}
                                placeholderContentFit='cover'
                                style={{ width: 50, height: 50, borderRadius: 50, alignSelf: 'center' }} />
                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto-medium',
                                color: Colors.lighter,
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                {item.first_name} {item.last_name}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5

                            }}>
                                <MaterialIcons name="location-on" size={14} color={Colors.secondary} />

                                <Text style={{
                                    fontSize: 12,
                                    letterSpacing: 1.2,
                                    fontFamily: 'roboto',
                                    color: Colors.lighter,
                                    paddingLeft: 2
                                }}>{item.location}</Text>
                            </View>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '100%',
                            paddingHorizontal: 8,
                            paddingTop: 5
                        }}>
                            <FontAwesome5 name="star" size={16} color={Colors.secondary} />

                            <Text style={{
                                fontSize: 14,
                                letterSpacing: 1.2,
                                fontFamily: 'roboto',
                                color: Colors.lighter,
                                paddingLeft: 5

                            }}>{item.user_rating}</Text>
                        </View>

                    </View>
                </Pressable>
            </Animated.View>
        )
    }

    return (
        <>
            <FlatList
                data={handymen || []}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                key={2}
                renderItem={renderHandymen}
                style={{ width: '100%', height: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
        </>
    )
}

export default HandymanList