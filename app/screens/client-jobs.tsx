import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import Loader from '@/components/loader'
import { useMyJob } from '@/hooks/useMyJob'

const ClientJobs = () => {
    const { loading } = useMyJob()

    return (
        <>
            <View style={defaultJobStyles.container}>
                <View style={defaultJobStyles.headerStyle}>
                    <Image source={require('@/assets/images/placeholder.jpg')} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <FontAwesome5
                        name="bell"
                        size={20}
                        color={Colors.secondary}
                    />
                </View>

                <View>
                    <Search placeholder='Search' />
                </View>
                <JobList />
            </View>
            <Loader isLoading={loading} />
        </>
    )
}

const defaultJobStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

    }
})

export default ClientJobs