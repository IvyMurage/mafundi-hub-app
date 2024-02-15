import { View, Text, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Animated, { FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { HandymanProps } from '@/types/handyman';

type JobProposalType = {
    id?: number,
    handyman: HandymanProps[] | null,
    proposal_text: string | null,
}
const Proposal = (props: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>>; taskId: number | null }) => {
    const { authState } = useAuth()
    const { visible, setVisible, taskId } = props
    const [proposals, setProposals] = useState<JobProposalType[]>([])
    console.log("This is the task id", taskId)
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/job_proposals/?task_id=${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setProposals(data?.job_proposals)
                }

                if (!response.ok) {
                    let error
                    if (data && data.errors) {
                        error = data.errors
                    }
                    else {
                        error = "Error fetching proposals"
                    }
                    throw new Error(error)
                }
                console.log("This is the data", data)
            }
            catch (error: any) {
                console.log("Error fetching proposals", error.message)
            }
        }

        fetchProposals()
    }, [taskId])
    return (
        <Animated.View entering={FadeOutUp} exiting={FadeOutDown} style={{
        }}>
            <Modal animationType='slide' visible={visible} transparent>
                <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <ScrollView style={{
                        width: '100%',
                        height: '100%',
                    }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1,
                            flexDirection: "column",
                            width: "100%",
                            paddingBottom: 50,
                            marginTop: 25,
                            paddingTop: 20,
                            paddingHorizontal: 10,
                            backgroundColor: Colors.lighter,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}>

                            <Text style={{
                                fontFamily: 'roboto-bold',
                                letterSpacing: 1.4,
                                paddingBottom: 5,
                                fontSize: 16,
                                color: Colors.secondary,
                                textAlign: 'center',
                            }}>Proposals</Text>
                            <Octicons name='x-circle' size={20} color={Colors.primary} onPress={() => {
                                setVisible(!visible)
                            }} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </Animated.View >

    )
}
const proposalStyle = StyleSheet.create({
    container: {
        flex: 1,

    }
})
export default Proposal