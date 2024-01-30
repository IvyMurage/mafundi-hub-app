import { View, Text } from 'react-native'
import React, { Fragment } from 'react'
import { useAuth } from '@/context/AuthContext'
import ClientProfile from '../(modals)/client-profile'

const Profile = () => {
    const { userState } = useAuth()
    console.log(userState?.roles[0].name)
    return (
        <Fragment>
            {userState?.roles[0].name === 'client' && <ClientProfile />}
            {userState?.roles[0].name === 'handyman' && <Text>Handyman</Text>}
        </Fragment>

    )
}

export default Profile