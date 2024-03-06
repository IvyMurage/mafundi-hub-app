import { View } from 'react-native'
import React, { useEffect } from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import Loader from '@/components/loader'
import { defaultJobStyles } from '@/constants/styles'
import { useTask } from '@/contexts/TaskContext'

const ClientJobs = () => {
    const { loading, getMyJobs, tasks } = useTask()
    useEffect(() => {
        getMyJobs!()
    }, [tasks])

    return (
        <>
            <View style={defaultJobStyles.container}>
                <View>
                    <Search placeholder='Search' />
                </View>
                <JobList tasks={tasks!} />
            </View>
            <Loader isLoading={loading!} />
        </>
    )
}

export default ClientJobs