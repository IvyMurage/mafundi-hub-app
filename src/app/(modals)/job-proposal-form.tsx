import { Text, TextInput, Pressable, Modal, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { taskFormStyles } from '@/constants/styles'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useAuth } from '@/contexts/AuthContext'
import { TaskIdProvider, useTaskId } from '@/contexts/TaskIdContext'


type ProposalFormProps = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    route: any // Add the 'route' property to the type definition
}

const ProposalForm = ({ route, }: ProposalFormProps) => {
    const { userState } = useAuth()
    const { authState } = useAuth()
    const { taskId } = useTaskId()

    const router = useRouter()
    const [proposal, setProposal] = useState({
        task_id: parseInt(taskId!),
        handyman_id: userState?.user_id,
        proposal_text: '',
    })
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://handyman.com/api/v1/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState?.token}`
                },
                body: JSON.stringify(proposal)
            })

            const data = await response.json()
            if (response.ok) {
                console.log("This is data from job proposal", data)
            }
            if (response.status === 401) {
                router.push('/login')
            }
            if (!response.ok) {
                throw new Error(data.error)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Formik
            initialValues={proposal}
            onSubmit={(values) => {
            }}>

            {({ values, handleChange, setFieldTouched, handleSubmit }) => (
                <SafeAreaView style={proposalFormStyles.modal}>
                    <FontAwesome5
                        name="arrow-left"
                        color={Colors.dark}
                        size={20}
                        onPress={() => { router.back() }}
                        style={{ paddingLeft: 20 }}
                    />
                    <ScrollView contentContainerStyle={proposalFormStyles.container}>
                        <Image source={require('@/assets/images/job-proposal.svg')} style={{ width: 300, height: 300 }} contentFit='contain' />

                        <Text style={proposalFormStyles.headerText}>Send Your job proposal</Text>
                        <TextInput
                            autoCapitalize='sentences'
                            onChangeText={handleChange('proposal_text')}
                            value={values.proposal_text}
                            onBlur={() => setFieldTouched('proposal_text')}
                            placeholder='Description(e.g I am a plumber...)'
                            numberOfLines={4}
                            multiline={true}
                            maxLength={300}
                            style={{ ...taskFormStyles.textarea, ...proposalFormStyles.textInput }}
                        />
                        <Pressable style={proposalFormStyles.submitBtn} onPress={() => handleSubmit()}>
                            <Text style={proposalFormStyles.submitText}>Send Proposal</Text>
                        </Pressable>
                    </ScrollView>
                </SafeAreaView>
            )}
        </Formik>
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