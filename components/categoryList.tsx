import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import TaskForm from '@/app/(modals)/task-form'
import { categoryListStyles } from '@/constants/styles'
import { CategoryPropType } from '@/types/category'


const CategoryList = ({ categories }: { categories: CategoryPropType[] }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const renderCategory = ({ item }: { item: CategoryPropType }) => {
        return (
            <Pressable
                onPress={() => setIsVisible(true)}
                style={categoryListStyles.categoryContainer}>
                <View key={item.id}>
                    <Image source={item.image_url} style={categoryListStyles.image} />
                    <Text style={categoryListStyles.categoryText}>{item.category_name}</Text>
                </View>
            </Pressable>
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

            <TaskForm isVisible={isVisible} setIsVisible={setIsVisible} />

        </View>
    )
}


export default CategoryList;