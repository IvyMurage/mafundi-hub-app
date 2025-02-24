import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Filter from '@/components/filter'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTask } from '@/contexts/TaskContext'
import { useLocations } from '@/contexts/LocationContext'

const HandymanJobs = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const { tasks, getMyJobs, service_id, location, available,  pageNumber, locations: taskLocations } = useTask()
    const { setLocations } = useLocations()
    const router = useRouter()


    useEffect(() => {
        getMyJobs!()
    }, [service_id, location, available, pageNumber])

    return (
        <>
            <View style={defaultJobStyles.container}>
                <View style={styles.filterOptions}>
                    <View style={{ flexGrow: 1 }}><Search placeholder='Search' /></View>
                    <Ionicons name='filter' size={24} color='rgba(0, 0, 0, .28)' onPress={() => setVisible(true)} />
                </View>
                <Pressable style={{
                    alignSelf: 'flex-end',
                    padding: 10,
                    backgroundColor: 'rgba(0, 0, 0, .1)',
                    borderRadius: 5,
                    marginBottom: 10,
                    marginRight: 10,
                }} onPress={() => { router.push('/(auth)/(screens)/maps') }}><Text style={{ fontFamily: 'roboto' }}>View on Maps</Text></Pressable>

                <JobList tasks={tasks!} />
                <Filter
                    visible={visible}
                    setVisible={setVisible}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    filterOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    }
})

export default HandymanJobs