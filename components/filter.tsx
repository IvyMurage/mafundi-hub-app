import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Select from './select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'

export const LocationFilter = ({ setLocation, visible }: { setLocation: Dispatch<SetStateAction<string>>, visible: boolean }) => {
    const locations = useLocation()

    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
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
                        profile={false}
                        handleChange={(value) => setLocation(value)}
                        searchPlaceHolder='Search for a Location'
                        task={true}
                    />
                </View>
            }
        </>
    )

}

export const ServiceFilter = ({ setService, visible }: { setService: Dispatch<SetStateAction<string>>, visible: boolean }) => {
    const services = useService()
    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>
                    <Select
                        data={services || []}
                        searchPlaceHolder='Search for a service'
                        handleChange={(value) => setService(value)}
                        defaultButtonText={'Service'}
                        profile={false}
                        task={true}
                    />
                </View>
            }
        </>
    )
}