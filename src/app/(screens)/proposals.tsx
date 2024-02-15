import { View, Text, Modal, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Animated, { FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { HandymanProps } from '@/types/handyman';
import Divider from '@/components/divider';
import ProposalNotFound from '@/components/proposal-not-found';

type JobProposalType = {
    id?: number,
    handyman?: HandymanProps[],
    proposal_text?: string,
}
const Proposal = (props: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>>; taskId: number | null }) => {
    const { authState } = useAuth()
    const { visible, setVisible, taskId } = props
    const [proposals, setProposals] = useState<JobProposalType[]>([])

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
                    setProposals(data?.job_proposal)
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


    const proposalList = proposals?.map((proposal) => {
        return (
            <View key={proposal.id} style={proposalStyle.proposalContainer}>
                <Text style={[proposalStyle.textStyle, { marginBottom: 10 }]}>
                    {proposal.proposal_text}
                </Text>
                <Divider />
                <View style={proposalStyle.btnContainer}>

                    <Pressable style={proposalStyle.btnProfile}>
                        <Text style={[proposalStyle.textStyle, { color: Colors.lighter, fontFamily: 'roboto-bold' }]}>View Profile</Text>
                    </Pressable>
                    <Pressable style={proposalStyle.button}>
                        <FontAwesome5 name="check" color={'green'} size={20} />
                    </Pressable>
                    <Pressable style={proposalStyle.button}>
                        <Octicons name="x" color={'red'} size={20} />
                    </Pressable>

                </View>
            </View>
        )
    })

    return (
        <Animated.View entering={FadeOutUp} exiting={FadeOutDown}>
            <Modal animationType='slide' visible={visible} transparent>
                <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <ScrollView style={proposalStyle.scroll} contentContainerStyle={proposalStyle.contentStyle}>
                        <View style={proposalStyle.container}>
                            <Text style={proposalStyle.proposalHeader}>Proposals</Text>
                            <Octicons name='x-circle' size={20} color={Colors.primary} onPress={() => {
                                setVisible(!visible)
                            }} />
                        </View>
                        {proposalList?.length === 0 ? <ProposalNotFound /> : proposalList}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </Animated.View >

    )
}
const proposalStyle = StyleSheet.create({
    proposalHeader: {
        fontFamily: 'roboto-bold',
        letterSpacing: 1.4,
        paddingBottom: 5,
        fontSize: 16,
        color: Colors.secondary,
        textAlign: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 10,
    },
    proposalContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 10,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    contentStyle: {
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
    }
    ,
    textStyle: {
        fontFamily: 'roboto',
        letterSpacing: 1.4,
        paddingBottom: 5,
        fontSize: 14,
        color: Colors.dark,
        textAlign: 'justify'
    },
    btnProfile: {
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Colors.primary
    },
    button: {
        backgroundColor: Colors.lighter,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
})
export default Proposal