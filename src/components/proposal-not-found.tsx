import { View, Text, } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useAuth } from '@/contexts/AuthContext'

const ProposalNotFound = () => {
    const { userState } = useAuth()
    return (
        <View style={{
            // flexGrow: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            height: userState?.user_role === 'client' ? '100%' : 'auto',
        }}>
            <Image source={require('@/assets/images/proposal_empty.svg')} style={{ width: 300, height: 300 }} contentFit='contain' />
            <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1.2, fontSize: 16, textAlign: 'center' }}>
                No Proposals Found
            </Text>
        </View>
    )
}

export default ProposalNotFound