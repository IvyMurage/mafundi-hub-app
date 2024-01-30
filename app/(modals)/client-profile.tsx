import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { FontAwesome5 } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/styles'
import Select from '@/components/select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import Colors from '@/constants/Colors'

const ClientProfile = () => {
    const [image, setImage] = useState<string>(require('@/assets/images/placeholder.jpg'))
    const locations = useLocation()

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: Colors.primary }}>
            <View style={clientProfileStyles.container}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        marginBottom: 20,
                        marginTop: 1
                    }}
                    source={image}
                />
                <ScrollView
                    style={clientProfileStyles.scroll}
                    contentContainerStyle={clientProfileStyles.contentContainer}
                >
                    <View style={clientProfileStyles.subContainer}>
                        <TextInput
                            autoCapitalize='none'
                            placeholder='First Name'
                            style={[
                                defaultStyles.inputTextField, clientProfileStyles.textInput]}
                        />

                        <TextInput
                            autoCapitalize='none'
                            placeholder='Last Name'
                            style={[defaultStyles.inputTextField, clientProfileStyles.textInput]}
                        />

                        <TextInput
                            autoCapitalize='none'
                            placeholder='Phone Number(07xxxx)'
                            style={[defaultStyles.inputTextField, clientProfileStyles.textInput]}
                        />

                        <Select
                            data={locations?.length > 0 &&
                                locations !== undefined &&
                                locations?.map((location) => {
                                    return {
                                        label: stringfy(location),
                                        value: stringfy(location)
                                    }
                                }) || []}
                            defaultButtonText='Location'
                            profile={true}
                            handleChange={(value) => console.log(value)}
                            searchPlaceHolder='Search for a Location'
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const clientProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'scroll',

    },
    subContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 30
    },
    scroll: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.light,
        overflow: 'scroll',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 12,
        overflow: 'scroll',

    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: Colors.secondary,
        paddingLeft: 20
    },

})
export default ClientProfile