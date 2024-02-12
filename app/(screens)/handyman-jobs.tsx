import { View } from 'react-native'
import React, { useState } from 'react'
import { TaskProvider, useTask } from '@/context/TaskContext'
import { Image } from 'expo-image'
import Search from '@/components/search'
import Loader from '@/components/loader'
import { FontAwesome5 } from '@expo/vector-icons'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import Select from '@/components/select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'

const HandymaJobs = () => {
    const { loading } = useTask()
    const locations = useLocation()
    const [location, setLocation] = useState('')
    const [service, setService] = useState('')
    const services = useService()
    return (
        <>
            <TaskProvider>
                <View style={defaultJobStyles.container}>
                    <View style={defaultJobStyles.headerStyle}>
                        <Image source={require('@/assets/images/placeholder.jpg')}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <FontAwesome5
                            name="bell"
                            size={20}
                            color={Colors.secondary}
                        />
                    </View>

                    <View>
                        <Search placeholder='Search' />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 20
                    }}>
                        <Select
                            data={locations?.length > 0 &&
                                locations !== undefined &&
                                locations?.map((location) => {
                                    return {
                                        label: stringfy(location),
                                        value: stringfy(location)
                                    }
                                }) || []}
                            defaultButtonText={'Location'}
                            profile={true}
                            handleChange={(value) => setLocation(value)}
                            searchPlaceHolder='Search for a Location'
                            task={false}
                        />

                        <Select
                            data={services || []}
                            searchPlaceHolder='Search for a service'
                            handleChange={(value) => setService(value)}
                            defaultButtonText={'Service'}
                            profile={true}
                            task={false}
                        />
                    </View>
                    <JobList />
                </View>
                <Loader isLoading={loading!} />
            </TaskProvider>
        </>
    )
}

export default HandymaJobs