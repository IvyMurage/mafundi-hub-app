import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Search from '@/components/search'
import JobList from '@/components/myJobList'

const ClientJobs = () => {

    return (
        <View style={defaultJobStyles.container}>
            <View>
                <Image source={require('@/assets/images/placeholder.jpg')} style={{ width: 50, height: 50 }} />
                <FontAwesome5
                    name="bell"
                    size={20}
                    color={Colors.secondary}
                />
            </View>
            <View>
                <Text>My Jobs</Text>
            </View>

            <View>
                <Search placeholder='Search' search={''} />
            </View>
            <JobList />
        </View>
    )
}

const defaultJobStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
    }
})

export default ClientJobs