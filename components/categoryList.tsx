import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'

const CategoryList = () => {
    const categories = useServiceCategory()
    console.log(categories)
    const renderCategory = ({ item }:
        {
            item: {
                id: number | null;
                category_name: string | null;
                image_url: string | null
            }
        }) => {
        return (
            <View key={item.id} style={categoryListStyles.categoryContainer}>
                <Image source={item.image_url} style={categoryListStyles.image} />
                <Text style={categoryListStyles.categoryText}>{item.category_name}</Text>
            </View>
        )
    }


    return (
        <View style={categoryListStyles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                numColumns={2}
                style={{ width: '100%', height: '100%', }}
                contentContainerStyle={categoryListStyles.flatListStyle}
            />
        </View>
    )
}

const categoryListStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListStyle: {
        paddingVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10
    },
    categoryContainer: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        letterSpacing: 1.2,
        textAlign: 'center',
        color: Colors.lighter,
        marginTop: 12
    }
})
export default CategoryList;