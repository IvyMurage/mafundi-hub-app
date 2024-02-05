import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import Search from '@/components/search'
import CategoryList from '@/components/categoryList'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { CategoryPropType } from '@/types/category'


type IconViewType = {
    title: string,
    icon: React.ComponentProps<typeof FontAwesome5>['name'] | React.ComponentProps<typeof MaterialIcons>['name']

}[]
const ClientHome = () => {
    const categoriesList = useServiceCategory()
    const [categories, setCategories] = useState<CategoryPropType[]>(categoriesList)

    const iconView: IconViewType = [{
        title: 'Electrician',
        icon: "electrical-services"
    },
    {
        title: 'Plumber',
        icon: "plumbing"
    },
    {
        title: 'Painter',
        icon: "format-paint"
    },
    {
        title: 'Cleaning',
        icon: "cleaning-services"

    }]


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

    const iconListView = iconView.map((item, index) => {
        return (
            <View key={index} style={[clientHomeStyles.iconView]}>
                <Text style={clientHomeStyles.iconText}>{item.title}</Text>
                <MaterialIcons name={item.icon} size={40} color={Colors.secondary} />
            </View>
        )
    }
    )
    return (
        <SafeAreaView style={[clientHomeStyles.safeareaView]}>
            <View style={[clientHomeStyles.container]}>
                <View style={[clientHomeStyles.notification]}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 40 }}
                        source={require('@/assets/images/placeholder.jpg')}
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
                    <Text style={[clientHomeStyles.headerText, clientHomeStyles.catergoryHeader]}>Categories</Text>
                    <ScrollView horizontal={true} contentContainerStyle={{}}>
                        {iconListView}
                    </ScrollView>
                </View>

                <CategoryList categories={categories} />
            </View>
        </SafeAreaView>
    )
}

const clientHomeStyles = StyleSheet.create({
    safeareaView: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: Colors.primary
    },
    container: {
        flex: 1

    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },

    notification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20
    },
    iconView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.lighter,
        borderRadius: 16,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconText: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: Colors.secondary,
        marginBottom: 10,
        letterSpacing: 1
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'poppins-bold',
        color: Colors.lighter,
        marginBottom: 10,
        letterSpacing: 1,
        lineHeight: 30
    },
    catergoryHeader: {
        paddingHorizontal: 20,
    }
})

export default ClientHome