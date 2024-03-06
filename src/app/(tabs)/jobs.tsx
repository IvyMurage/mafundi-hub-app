import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientJobs from '../(screens)/client-jobs'
import { TaskProvider } from '@/contexts/TaskContext'

const Jobs = () => {
    const { userState } = useAuth()
    return (
        <>
            <View style={{
                flex: 1, position: 'absolute',
                top: 0,
                left: 0,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                zIndex: -1,
            }}>
                {userState?.user_role === 'client' ? (<>
                    <TaskProvider>
                        <ClientJobs />
                    </TaskProvider>
                </>
                ) : (
                    <>
                        <Text>Messages</Text>
                    </>
                )}
            </View>
        </>
    )
}

export default Jobs