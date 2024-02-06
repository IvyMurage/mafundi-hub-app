import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { HandymanType } from '@/types/handyman'
import { useHandyman } from '@/context/HandymanContext'

const HandymanList = () => {
    const { handymen } = useHandyman()
    const renderHandymen = ({ item }: { item: HandymanType }) => {
        return (
            <Pressable>
                <View>
                    <Image source={require('@/assets/images/placeholder.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
                    <Text>{item.first_name} {item.last_name}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.user_rating}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <FlatList
                data={handymen || []}
                renderItem={renderHandymen}
                style={{ width: '100%', height: '100%', padding: 10 }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
        </>
    )
}

export default HandymanList