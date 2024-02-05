import { View, Text, Pressable, FlatList, } from 'react-native'
import React, { useRef, useState } from 'react'
import { JobPropType } from '@/types/job'
import Colors from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import Proposal from '@/app/screens/proposal'
import { jobListStyle } from '@/constants/styles'
import { useTask } from '@/context/TaskContext'

const JobList = () => {
    // const { jobs } = useMyJob()
    const { tasksState } = useTask()
    // console.log(tasksState)
    const [visible, setVisible] = useState<boolean>(false)
    // console.log(jobs)
    const jobRef = useRef<FlatList<JobPropType> | null>(null)
    const renderMyJobs = ({ item }:
        {
            item: JobPropType
        }) => {
        return (
            <Pressable onPress={() => console.log("You can view the proposals")}>
                <View key={item.id} style={jobListStyle.jobContainer}>
                    <Text
                        onPress={() => setVisible(!visible)}
                        style={[jobListStyle.jobText,
                        { textAlign: 'right' }]}>
                        View Proposals
                    </Text>
                    <View style={jobListStyle.jobBody}>
                        <Text style={
                            [jobListStyle.jobText,
                            {
                                fontSize: 18,
                                fontFamily: "poppins-bold",
                                letterSpacing: 1.8
                            }]}>
                            {item?.job_title}
                        </Text>
                        <Text style={
                            [jobListStyle.jobText,
                            { fontFamily: 'poppins-medium' }]}>
                            {item?.job_category}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <FontAwesome6 name="location-dot" size={16} color={Colors.secondary} />
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
            <FlatList
                ref={jobRef}
                data={tasksState || []}
                renderItem={renderMyJobs}
                style={{ width: '100%', height: '100%', padding: 10 }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
            <Proposal visible={visible} setVisible={setVisible} />
        </>
    )
}



export default JobList