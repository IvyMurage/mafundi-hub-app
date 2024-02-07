import { View, Text } from 'react-native'
import React from 'react'
import { TaskProvider, useTask } from '@/context/TaskContext'
import { Image } from 'expo-image'
import Search from '@/components/search'
import Loader from '@/components/loader'
import { FontAwesome5 } from '@expo/vector-icons'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'

const HandymaJobs = () => {
    const { loading } = useTask()
    return (
        <>
            <TaskProvider>
                <View style={defaultJobStyles.container}>
                    <View style={defaultJobStyles.headerStyle}>
                        <Image source={require('@/assets/images/placeholder.jpg')}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
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
                <Loader isLoading={loading!} />
            </TaskProvider>
        </>
    )
}

export default HandymaJobs