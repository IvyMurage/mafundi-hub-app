import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import Loader from '@/components/loader'
import CustomAlert from '@/components/customAlert'
import { useRouter } from 'expo-router'
import ProposalNotFound from '@/components/proposal-not-found'

export interface ProposalType {
    job_status?: string | null,
    id: number,
    task_title: string,
    proposal_text: string
    handyman_id?: number
}
const HandymanProposals = () => {
    const [proposals, setProposals] = useState<ProposalType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string[]>([])
    const { userState, authState } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const getProposals = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/job_proposals?handyman_id=${userState?.user_id}`, {
                    headers: { 'Authorization': `Bearer ${authState?.token}` }
                })
                const data = await response.json()
                if (response.ok) {
                    setProposals(data?.job_proposals?.map((proposal: ProposalType) => {
                        return {
                            job_status: proposal.job_status,
                            id: proposal.id,
                            task_title: proposal.task_title,
                            proposal_text: proposal.proposal_text
                        }
                    }))
                }

                if (response.status === 401) {
                    // router.push('/login')
                }

                if (!response.ok) {
                    throw new Error(data.error)
                }
            }
            catch (error: any) {
                console.log(error.message)
                setError([error.message])
            }
            finally {
                setLoading(false)
            }
        }
        getProposals()
    }, [])
    // console.log(proposals)
    const renderProposals = ({ item }: { item: ProposalType }) => {
        return (
            <View style={proposalScreenStyles.proposalConatiner}>
                <View style={proposalScreenStyles.proposalSubContainer}>
                    <Text style={proposalScreenStyles.proposalTextTitle}>{item.task_title}</Text>
                    <Text style={proposalScreenStyles.proposalTextStatus}>{item.job_status}</Text>
                </View>
                <Text style={proposalScreenStyles.proposalText}>{item.proposal_text}</Text>
            </View >
        )
    }
    return (
        <SafeAreaView style={proposalScreenStyles.safeView}>
            <Ionicons name='arrow-back' color={Colors.lighter} size={24} style={{ marginLeft: 18, marginTop: 30 }} onPress={() => router.back()} />
            <View style={proposalScreenStyles.container}>
                <Text style={proposalScreenStyles.headerText}>Proposals</Text>
                {!loading && proposals.length === 0 && <ProposalNotFound />}
                <FlatList
                    data={proposals}
                    renderItem={renderProposals}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ width: '100%', height: '100%', padding: 10 }}
                    contentContainerStyle={{ paddingBottom: 200, flexGrow: 1 }}
                />
            </View>
            {
                error.length > 0 && <CustomAlert
                    visible={error.length > 0}
                    onClose={() => setError([])}
                    message={error[0]} />
            }
            <Loader isLoading={loading} />
        </SafeAreaView>
    )
}


const proposalScreenStyles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    container: {
        backgroundColor: Colors.lighter,
        marginTop: 60,
        height: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.8,
        color: Colors.dark,
        textAlign: 'left',
        padding: 20
    },
    proposalConatiner: {
        backgroundColor: Colors.light,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    proposalSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    proposalTextTitle: {
        fontSize: 12,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.8,
        color: Colors.dark,
        textAlign: 'left'
    },
    proposalTextStatus: {
        fontSize: 12,
        fontFamily: 'roboto',
        fontWeight: '600',
        letterSpacing: 1.8,
        backgroundColor: Colors.primary,
        color: Colors.lighter,
        borderRadius: 20,
        textAlign: 'justify',
        padding: 10
    },
    proposalText: {
        fontSize: 12,
        fontFamily: 'roboto',
        fontWeight: '600',
        letterSpacing: 1.8,
        lineHeight: 24,
        color: Colors.dark,
        textAlign: 'justify',
        padding: 10
    }
})
export default HandymanProposals