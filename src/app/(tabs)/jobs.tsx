import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientJobs from '../(screens)/client-jobs'
import { TaskProvider } from '@/contexts/TaskContext'
import HandymaJobs from '../(screens)/handyman-jobs'

const Jobs = () => {
    const { userState } = useAuth()
    return (
        <>
            <TaskProvider>
                {userState?.user_role === 'client' ? (<>
                    <ClientJobs />
                </>
                ) : (
                    <>
                        <HandymaJobs />
                    </>
                )}
            </TaskProvider>
        </>
    )
}

export default Jobs