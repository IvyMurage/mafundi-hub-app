import { View, Text, Pressable, FlatList, } from 'react-native'
import React, { useRef, useState } from 'react'
import { JobPropType } from '@/types/job'
import Colors from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import Proposal from '@/app/(screens)/proposals'
import { jobListStyle } from '@/constants/styles'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import { useAuth } from '@/contexts/AuthContext'
import NotFound from './not-found'
import { useRouter } from 'expo-router'

const JobList = () => {
    const { tasks, setPageNumber } = useTask()
    const [jobId, setJobId] = useState<number | null>(null)
    const router = useRouter()
    const [visible, setVisible] = useState<boolean>(false)
    const jobRef = useRef<FlatList<JobPropType> | null>(null)
    const { userState } = useAuth()

    const handlePress = (jobId: number) => {
        if (userState?.user_role === 'handyman') {
            router.push(`/job-listing/${jobId}`)
        }
    }

    console.log(tasks, 'tasks')
    const renderMyJobs = ({ item }:
        {
            item: JobPropType
        }) => {
        return (
            <Pressable onPress={() => handlePress(item.id!)}>
                <View key={item.id} style={jobListStyle.jobContainer}>
                    <Text
                        onPress={() => {
                            setJobId(item.id!)
                            setVisible(!visible)
                        }}
                        style={[jobListStyle.jobText,
                        ...[userState?.user_role === 'client' ?
                            { color: Colors.secondary } : item.available ?
                                { color: 'green' } : { color: 'red' }],
                        { textAlign: 'right' },
                        { fontFamily: 'roboto-bold' }]}>
                        {userState?.user_role === 'client' ? "View Proposals" :
                            item.available ? "Available" : "Not Available"}
                    </Text>
                    <View style={jobListStyle.jobBody}>
                        <Text style={
                            [jobListStyle.jobText,
                            {
                                fontSize: 18,
                                fontFamily: "roboto-bold",
                                letterSpacing: 1.8
                            }]}>
                            {item?.job_title}
                        </Text>
                        <Text style={
                            [jobListStyle.jobText,
                            { fontFamily: 'roboto-medium' }]}>
                            {item?.job_category}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <MaterialIcons name="location-pin" size={16} color={Colors.secondary} />
                            <Text style={[jobListStyle.jobText, { fontSize: 10 }]}>
                                {item.job_location}
                            </Text>
                        </View>
                    </View>
                    <View style={jobListStyle.jobFooter}>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.job_price}</Text>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.duration_label}</Text>
                    </View>
                </View>
            </Pressable >
        )
    }
    return (
        <>
            <TaskProvider>
                {
                    tasks?.length === 0 ?
                        <NotFound />
                        :
                        <>
                            <FlatList
                                ref={jobRef}
                                data={tasks || []}
                                renderItem={renderMyJobs}
                                style={{ width: '100%', height: '100%', padding: 10 }}
                                contentContainerStyle={{ paddingBottom: 120 }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                position: 'absolute',
                                top: '85%',
                            }}>
                                <Pressable style={{
                                    alignSelf: 'flex-end',
                                    paddingBottom: 100,
                                    paddingHorizontal: 20,
                                }} onPress={() => {
                                    setPageNumber!((prevPage) => prevPage === 1 ? 1 : prevPage - 1)
                                }}>
                                    <Text style={{ color: Colors.secondary }}>
                                        Previous
                                    </Text>
                                </Pressable>

                                <Pressable style={{
                                    alignSelf: 'flex-end',
                                    paddingBottom: 100,
                                    paddingHorizontal: 20,
                                }} onPress={() => {
                                    setPageNumber!((prevPage) => prevPage + 1)
                                }}>
                                    <Text style={{ color: Colors.secondary }}>
                                        Next
                                    </Text>
                                </Pressable>

                            </View>
                            <Proposal visible={visible} setVisible={setVisible} taskId={jobId} />
                        </>
                }
            </TaskProvider>
        </>
    )
}



export default JobList