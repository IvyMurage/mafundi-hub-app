import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import ClientJobs from '../screens/client-jobs'
import { TaskProvider } from '@/context/TaskContext'

const Jobs = () => {
    const { userState } = useAuth()
    return (
        <>
            <TaskProvider>
                {userState?.user_role === 'client' ? (<>
                    <ClientJobs />
                </>
                ) : (
                    <View>
                        <Text>Handyman Home</Text>
                    </View>
                )}
            </TaskProvider>
        </>
    )
}

export default Jobs