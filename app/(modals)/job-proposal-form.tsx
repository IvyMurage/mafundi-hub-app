import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProposalForm = () => {
    return (
        <SafeAreaView>
            <View>
                <Image source={require('@/assets/images/job-proposal.svg')} style={{ width: 300, height: 300 }} />

                <Text>Send Your job proposal</Text>
                <TextInput
                    placeholder='Description(e.g I am a plumber...)'
                    numberOfLines={4}
                    multiline={true}
                    maxLength={300}
                />

                <Pressable>
                    <Text>Send Proposal</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    )
}

export default ProposalForm