import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useMyJob } from '@/hooks/useMyJob'
import { JobPropType } from '@/types/job'
import Colors from '@/constants/Colors'
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'

const JobList = () => {
    const jobs = useMyJob()
    console.log(jobs)
    const renderMyJobs = ({ item }:
        {
            item: JobPropType
        }) => {
        return (
            <Pressable onPress={() => console.log("You can view the proposals")}>
                <View key={item.id} style={jobListStyle.jobContainer}>
                    <Text
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
        <View>
            <FlatList
                data={jobs}
                renderItem={renderMyJobs}
                style={{ width: '100%', height: '100%', }}
            />
        </View>
    )
}

const jobListStyle = StyleSheet.create({
    jobContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.lighter,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    jobText: {
        fontSize: 14,
        fontFamily: "poppins",
        letterSpacing: 1.2,
        padding: 5
    },
    proposalContainer: {
        alignSelf: 'flex-end'
    },
    jobBody: {
        borderBottomWidth: .5,
        borderBottomColor: "grey",
        paddingBottom: 10,
        marginBottom: 10,
    },
    jobFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default JobList