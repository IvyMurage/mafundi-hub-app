import { View, Text, ScrollView, Dimensions } from 'react-native'
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
                <View style={{
                    flex: 1,   position: 'absolute',
                    top: 0,
                    left: 0,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    zIndex: -1,
                }}>
                    <View>
                        <Text>Jobs</Text>
                    </View>
                    {userState?.user_role === 'client' ? (<>
                        <ClientJobs />
                    </>
                    ) : (
                        <>
                            <HandymaJobs />
                        </>
                    )}
                </View>
            </TaskProvider>
        </>
    )
}

export default Jobs