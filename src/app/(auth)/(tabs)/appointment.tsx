import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import HandymanProposals from '@/app/(auth)/(screens)/handyman-proposal'
import Appointments from '@/app/(auth)/(screens)/notifications'

const Alert = () => {
    const { userState } = useAuth()
    return (
        <>
            {userState?.user_role === 'client' ? <Appointments /> : <HandymanProposals />}
        </>
    )
}

export default Alert