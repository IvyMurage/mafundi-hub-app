import { View } from 'react-native'
import React from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import Loader from '@/components/loader'
import { defaultJobStyles } from '@/constants/styles'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import { useAuth } from '@contexts/AuthContext'

const ClientJobs = () => {
    const { loading } = useTask()
    const { userState } = useAuth()
    // console.log(userState?.avatar_url)
    // console.log(loading, "loading")
    return (
        <>
            <TaskProvider>
                <View style={defaultJobStyles.container}>
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



export default ClientJobs