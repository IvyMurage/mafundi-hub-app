import { View } from 'react-native'
import React, { useEffect } from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import Loader from '@/components/loader'
import { defaultJobStyles } from '@/constants/styles'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import { useAuth } from '@contexts/AuthContext'

const ClientJobs = () => {
    const { loading, getMyJobs, tasks } = useTask()
    const { userState } = useAuth()
    useEffect(() => {
        getMyJobs!()
    }, [tasks])

    return (
        <>
            <TaskProvider>
                <View style={defaultJobStyles.container}>
                    <View>
                        <Search placeholder='Search' />
                    </View>
                    <JobList tasks={tasks!} />
                </View>
                <Loader isLoading={loading!} />
            </TaskProvider>
        </>
    )
}

export default ClientJobs