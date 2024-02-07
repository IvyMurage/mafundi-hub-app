import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { HandymanType } from '@/types/handyman'
import { useHandyman } from '@/context/HandymanContext'
import Colors from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'

const HandymanList = () => {
    const { handymen } = useHandyman()
    const renderHandymen = ({ item }: { item: HandymanType }) => {
        return (
            <Pressable>
                <View style={{
                    flex: 1,
                    width: 180,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    padding: 8,
                    margin: 10,
                    borderRadius: 10
                }}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.light,
                        width: '100%',
                        paddingHorizontal: 8
                    }}>
                        <Image source={require('@/assets/images/placeholder.jpg')}
                            style={{ width: 80, height: 80, borderRadius: 80, alignSelf: 'center' }} />
                        <Text style={{
                            fontSize: 14,
                            letterSpacing: 1.2,
                            fontFamily: 'poppins-medium',
                            color: Colors.lighter
                        }}>
                            {item.first_name} {item.last_name}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'

                        }}>
                            <FontAwesome6 name="location-dot" size={14} color={Colors.secondary} />

                            <Text style={{
                                fontSize: 12,
                                letterSpacing: 1.2,
                                fontFamily: 'poppins',
                                color: Colors.lighter,
                                paddingLeft: 5


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
                        <FontAwesome6 name="star" size={16} color={Colors.secondary} />

                        <Text style={{
                            fontSize: 14,
                            letterSpacing: 1.2,
                            fontFamily: 'poppins',
                            color: Colors.lighter,
                            paddingLeft: 5

                        }}>{item.user_rating}</Text>
                    </View>

                </View>
            </Pressable>
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