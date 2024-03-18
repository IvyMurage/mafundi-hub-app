import { Text, TextInput, Pressable, Modal, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { taskFormStyles } from '@/constants/styles'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useAuth } from '@/contexts/AuthContext'
import { useTaskId } from '@/contexts/TaskIdContext'
import { request } from '@/utils/executePostRequest'
import CustomAlert from '@/components/customAlert'
import Loader from '@/components/loader'

const ProposalForm = () => {
    const { userState } = useAuth()
    const { authState } = useAuth()
    const { taskId } = useTaskId()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string[]>([])
    const router = useRouter()
    const [proposal, setProposal] = useState({
        task_id: parseInt(taskId!),
        handyman_id: userState?.user_id,
        proposal_text: '',
        job_status: 'proposed'

    })
    const handleSubmit = async (values: { task_id: number; handyman_id: number | null | undefined; proposal_text: string }) => {
        setLoading(true)
        try {
            const payload = {
                ...values,
                task_id: parseInt(taskId!),
                handyman_id: userState?.user_id
            }
            const { response, data } = await request('POST', JSON.stringify(payload), '/job_proposals', authState?.token!)
            if (response.ok) {
                setSuccess(data?.success)

            }
            if (response.status === 401) {
                router.push('/login')
            }
            if (!response.ok) {
                throw new Error(data.error)
            }
        }
        catch (error: any) {
            console.log("ERror", error.message)
            setError([error.message])
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Formik
            initialValues={proposal}
            onSubmit={(values) => handleSubmit(values)}>

            {({ values, handleChange, setFieldTouched, handleSubmit }) => (
                <>
                    <SafeAreaView style={proposalFormStyles.modal}>
                        <Ionicons
                            name='arrow-back'
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
                            <CustomAlert
                                visible={success}
                                onClose={() => {
                                    setSuccess(false)
                                    router.push('/(tabs)/appointment')
                                }}
                                message="Your proposal has been sent successfully"
                            />

                            {
                                error.length > 0 && error.map((err, index) => {
                                    return (
                                        <CustomAlert
                                            key={index}
                                            visible={true}
                                            onClose={() => setError([])}
                                            message={err}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </SafeAreaView>
                    <Loader isLoading={loading} />
                </>
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