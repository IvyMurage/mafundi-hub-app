import React from 'react'
import Select from '@/components/select'
import { View, Text, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useService } from '@/hooks/useService'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'

const TaskForm = () => {
    const services = useService()
    const locations = useLocation()
    return (
        <SafeAreaView>
            <View>
                <Text>Create Task</Text>
                <View>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='default'
                        placeholder='Title (e.g. "Cleaning")'
                        returnKeyLabel='next'

                    />
                </View>
                <View>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyLabel='next'
                        keyboardType='default'
                        inputMode='decimal'
                        placeholder="Job price"
                    />
                    <Select
                        data={services || []}
                        searchPlaceHolder='Search for a service'
                        handleChange={(value) => console.log(value)}
                        defaultButtonText='Service'
                        profile={false}
                    />
                </View>

                <View>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='default'
                        placeholder='Duratuion (e.g. "2 hours")'
                        returnKeyLabel='next'
                    />
                    <Select
                        data={[{ label: 'true', value: 'true' }, { label: 'true', value: 'false' }] || []}
                        searchPlaceHolder='Search for a service'
                        handleChange={(value) => console.log(value)}
                        defaultButtonText='Instant Booking'
                        profile={false}
                    />
                </View>

                <View>
                    <Select
                        data={locations?.length > 0 &&
                            locations !== undefined &&
                            locations?.map(location => { return { label: stringfy(location), value: stringfy(location) } }) || []}
                        defaultButtonText='Location'
                        handleChange={(value) => console.log(value)}
                        searchPlaceHolder='Search for a Location'
                        profile={false}
                    />
                </View>

                <View>
                    <TextInput
                        multiline={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='default'
                        placeholder='Description (e.g. "Cleaning")'
                        numberOfLines={10}
                        returnKeyLabel='Done'
                    />
                </View>

                <Pressable>
                    <Text>Create Task</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    )
}

export default TaskForm