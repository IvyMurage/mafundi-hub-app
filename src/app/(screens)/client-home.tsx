import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import Search from '@/components/search'
import CategoryList from '@/components/categoryList'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { CategoryPropType } from '@/src/types/category'
import { clientHomeStyles } from '@/constants/styles'
import { iconView } from '@/constants/icons'
import { TaskProvider } from '@/contexts/TaskContext'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { useAuth } from '@/contexts/AuthContext'



const ClientHome = () => {
    const categoriesList = useServiceCategory()
    const [categories, setCategories] = useState<CategoryPropType[]>(categoriesList)
    const { userState } = useAuth()
    useEffect(() => {
        setCategories(categoriesList)
    }, [categoriesList])

    const handleChange = (value: string) => {
        if (value === '') {
            setCategories(categoriesList)
        }
        else {
            setCategories(categoriesList.filter((item) => item.category_name?.toLowerCase().includes(value.toLowerCase())))
        }
    }

    const iconListView = iconView.length > 0 && iconView?.map((item, index) => {
        return (
            <View key={index} style={[clientHomeStyles.iconView]}>
                <Text style={clientHomeStyles.iconText}>{item.title}</Text>
                <MaterialIcons name={item.icon} size={40} color={Colors.secondary} />
            </View>
        )
    }
    )
    return (
        <TaskProvider>
            < SafeAreaView style={[clientHomeStyles.safeareaView]}>
                <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={[clientHomeStyles.container]}>
                    <View style={[clientHomeStyles.notification]}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 40 }}
                            source={{ uri: userState?.avatar_url! } || require('@/assets/images/placeholder.jpg')}
                        />
                        <FontAwesome5
                            name="bell"
                            size={20}
                            color={Colors.secondary}
                        />
                    </View>
                    <View style={[clientHomeStyles.headerContainer]}>
                        <Text style={[clientHomeStyles.headerText]}>Find the Best</Text>
                        <Text style={[clientHomeStyles.headerText]}><Text style={{ color: Colors.secondary }}>Handyman</Text> Service Providers</Text>
                    </View>

                    <View>
                        <Search placeholder="Search for a service" handleChange={handleChange} />
                    </View>

                    <View>
                        <Text style={[clientHomeStyles.catergoryHeader]}>Categories</Text>
                        <ScrollView horizontal={true} contentContainerStyle={{}}>
                            {iconListView}
                        </ScrollView>
                    </View>

                    <CategoryList categories={categories} />
                </Animated.View>
            </SafeAreaView>
        </TaskProvider>
    )
}



export default ClientHome