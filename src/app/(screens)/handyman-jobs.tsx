import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Filter from '@/components/filter'
import { Ionicons } from '@expo/vector-icons'

const HandymanJobs = () => {
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <>
            <View style={defaultJobStyles.container}>
                <View style={styles.filterOptions}>
                    <View style={{ flexGrow: 1 }}><Search placeholder='Search' /></View>
                    <Ionicons name='filter' size={24} color='rgba(0, 0, 0, .28)' onPress={() => setVisible(true)} />
                </View>
                <JobList />

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