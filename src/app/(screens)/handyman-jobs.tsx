import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import { Image } from 'expo-image'
import Search from '@/components/search'
import Loader from '@/components/loader'
import { FontAwesome5 } from '@expo/vector-icons'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { useLocation } from '@/hooks/useLocation'
import { useService } from '@/hooks/useService'
import { LocationFilter, ServiceFilter } from '@/components/filter'
import Divider from '@/components/divider'
import { Text } from 'react-native'

const HandymaJobs = () => {
    const { loading } = useTask()
    const locations = useLocation()
    const [location, setLocation] = useState('')
    const [service, setService] = useState('')
    const [visible, setVisible] = useState(false)
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
                        <Divider />
                        <Pressable style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'flex-end',
                            position: 'relative',
                            bottom: 52,
                        }} onPress={() => {
                            setVisible(!visible)
                        }}>
                            <FontAwesome5
                                name='filter'
                                size={20}
                                color={Colors.primary}
                                style={[
                                    {
                                        paddingHorizontal: 40,
                                    }, visible && {
                                        transform: [{ rotate: '-90deg' }]
                                    }]} />
                            {/* 'Filter' */}
                        </Pressable>
                    </View>
                    {visible && <Text style={{
                        fontFamily: 'roboto-medium',
                        letterSpacing: 1.2,
                        paddingBottom: 5,
                        fontSize: 16,
                        color: '#000',
                        paddingHorizontal: 16,

                    }}>Filter</Text>}
                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                    }, visible && {
                        marginTop: 20,
                        marginBottom: 20
                    }]}>


                        <LocationFilter
                            setLocation={setLocation}
                            visible={visible}
                        />

                        <ServiceFilter
                            setService={setService}
                            visible={visible}
                        />
                    </View>
                    {
                        visible && <Divider />
                    }


                    <JobList />
                </View>
                <Loader isLoading={loading!} />
            </TaskProvider>
        </>
    )
}

export default HandymaJobs