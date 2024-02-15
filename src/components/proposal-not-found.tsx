import { View, Text, } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const ProposalNotFound = () => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <Image source={require('@/assets/images/proposal_empty.svg')} style={{ width: 300, height: 300 }} />
            <Text style={{ fontFamily: 'roboto-medium', letterSpacing: 1.2, fontSize: 16, textAlign: 'center' }}>
                No Proposals Found
            </Text>
        </View>
    )
}

export default ProposalNotFound