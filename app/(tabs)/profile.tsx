import { View, Text } from 'react-native'
import React, { Fragment } from 'react'
import { useAuth } from '@/context/AuthContext'
import ClientProfile from '../(modals)/client-profile'

const Profile = () => {
    const { userState } = useAuth()
    console.log(userState?.user_role)
    return (
        <Fragment>
            {userState?.user_role === 'client' && <ClientProfile />}
            {userState?.user_role === 'handyman' && <Text>Handyman</Text>}
        </Fragment>

    )
}

export default Profile