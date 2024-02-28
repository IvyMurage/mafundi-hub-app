import { View, Text } from 'react-native'
import React from 'react'
import ChatApp from '@/components/chatApp'
import { useAuth } from '@/contexts/AuthContext'
import HandymanProposals from '../(screens)/handyman-proposal'
import Notifications from '../(screens)/notifications'

const Alert = () => {
    const { userState } = useAuth()
    return (
        <>
            {userState?.user_role === 'client' ? <Notifications /> : <HandymanProposals />}
        </>
    )
}

export default Alert