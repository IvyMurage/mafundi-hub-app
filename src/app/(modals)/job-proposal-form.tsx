import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { taskFormStyles } from '@/constants/styles'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

type ProposalFormProps = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>

}
const ProposalForm = ({ visible, setVisible }: ProposalFormProps) => {
    const router = useRouter()
    return (
        <Modal animationType='slide' visible={visible} >
            <SafeAreaView style={proposalFormStyles.modal}>
                <FontAwesome5
                    name="arrow-left"
                    color={Colors.dark}
                    size={20}
                    onPress={() => { router.back() }}
                    style={{ paddingLeft: 20 }}
                />
                <View style={proposalFormStyles.container}>
                    <Image source={require('@/assets/images/job-proposal.svg')} style={{ width: 300, height: 300 }} contentFit='contain' />

                    <Text style={proposalFormStyles.headerText}>Send Your job proposal</Text>
                    <TextInput
                        placeholder='Description(e.g I am a plumber...)'
                        numberOfLines={4}
                        multiline={true}
                        maxLength={300}
                        style={{ ...taskFormStyles.textarea, ...proposalFormStyles.textInput }}
                    />
                    <Pressable style={proposalFormStyles.submitBtn}>
                        <Text style={proposalFormStyles.submitText}>Send Proposal</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Modal>

    )
}
const proposalFormStyles = StyleSheet.create({
    modal: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: Colors.light
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 0,
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.8,
        color: Colors.dark,
        textAlign: 'center',
        padding: 10
    },
    textInput: {
        height: 150,
        backgroundColor: Colors.lighter,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '100%'
    },
    submitText: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.8,
        color: Colors.lighter,
        textAlign: 'center',
    }
})
export default ProposalForm