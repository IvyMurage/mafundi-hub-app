import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Search from '@/components/search'
import { useMyJob } from '@/hooks/useMyJob'

const ClientJobs = () => {
    const jobs = useMyJob()
    console.log(jobs)
    return (
        <View>
            <View>
                <Image source={require('@/assets/images/placeholder.jpg')} style={{ width: 50, height: 50 }} />
                <FontAwesome5
                    name="bell"
                    size={20}
                    color={Colors.secondary}
                />
            </View>
            <View>
                <Text>My Jobs</Text>
            </View>

            <View>
                <Search placeholder='Search' search={''} />


            </View>
        </View>
    )
}

export default ClientJobs