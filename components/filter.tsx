import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Select from './select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'

const LocationFilter = ({ setLocation, visible }: { setLocation: Dispatch<SetStateAction<string>>, visible: boolean }) => {
    const locations = useLocation()

    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontFamily: 'roboto-medium',
                        letterSpacing: 1.2,
                        paddingBottom: 5,
                        fontSize: 16,
                        color: '#000'

                    }}>Filter</Text>
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
                        task={false}
                    />
                </View>
            }
        </>
    )

}

export default LocationFilter