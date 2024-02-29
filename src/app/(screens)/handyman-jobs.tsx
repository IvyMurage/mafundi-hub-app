import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import Search from '@/components/search'
import Loader from '@/components/loader'
import { FontAwesome5 } from '@expo/vector-icons'
import JobList from '@/components/myJobList'
import { defaultJobStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
import { LocationFilter, ServiceFilter } from '@/components/filter'
import Divider from '@/components/divider'
import { Text } from 'react-native'

const HandymanJobs = () => {
    const [location, setLocation] = useState('')
    const [service, setService] = useState('')
    const [visible, setVisible] = useState(false)
    return (
        <>
            <View style={defaultJobStyles.container}>
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
        </>
    )
}

export default HandymanJobs