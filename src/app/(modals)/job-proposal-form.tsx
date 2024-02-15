import { View, Text, Image, TextInput, Pressable, Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { taskFormStyles } from '@/constants/styles'

type ProposalFormProps = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>

}
const ProposalForm = ({ visible, setVisible }: ProposalFormProps) => {
    return (
        <Modal animationType='slide' visible={visible} transparent>
            <SafeAreaView style={taskFormStyles.safeareaStyle}>
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
        </Modal>

    )
}

export default ProposalForm