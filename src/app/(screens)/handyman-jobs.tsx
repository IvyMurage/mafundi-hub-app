import { View } from 'react-native'
import React, { useState } from 'react'
import Search from '@/components/search'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Filter from '@/components/filter'


const HandymanJobs = () => {
    const [visible, setVisible] = useState<boolean>(true)
    return (
        <>
            <View style={defaultJobStyles.container}>
                <View>
                    <Search placeholder='Search' />
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

export default HandymanJobs