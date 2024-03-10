import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import HandymanProposals from '../(screens)/handyman-proposal'
import Appointments from '../(screens)/notifications'

const Alert = () => {
    const { userState } = useAuth()
    return (
        <>
            {userState?.user_role === 'client' ? <Appointments /> : <HandymanProposals />}
        </>
    )
}

export default Alert