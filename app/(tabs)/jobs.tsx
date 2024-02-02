import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import ClientJobs from '../screens/client-jobs'

const Jobs = () => {
    const { userState } = useAuth()
    return (
        <>
            {userState?.user_role === 'client' ? (<>
                <ClientJobs />
            </>
            ) : (
                <View>
                    <Text>Handyman Home</Text>
                </View>
            )}
        </>
    )
}

export default Jobs