import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import TaskForm from '@/src/app/(modals)/task-form'
import { categoryListStyles } from '@/constants/styles'
import { CategoryPropType } from '@/src/types/category'
import Animated, { FadeInDown, FadeInUp, } from 'react-native-reanimated'


const CategoryList = ({ categories }: { categories: CategoryPropType[] }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const renderCategory = ({ item }: { item: CategoryPropType }) => {
        return (

            <Pressable
                onPress={() => setIsVisible(true)}
                style={categoryListStyles.categoryContainer}>
                <View key={item.id}>
                    <Text style={categoryListStyles.categoryText}>{item.category_name}</Text>
                </View>
            </Pressable>

        )
    }
    return (
        <View style={categoryListStyles.container}>
            <Animated.FlatList
                entering={FadeInUp}
                exiting={FadeInDown}
                data={categories}
                renderItem={renderCategory}
                numColumns={3}
                key={Math.random()}
                style={{ width: '100%', height: '100%', }}
                contentContainerStyle={categoryListStyles.flatListStyle}
            />

            <TaskForm isVisible={isVisible} setIsVisible={setIsVisible} />

        </View>
    )
}



export default CategoryList;