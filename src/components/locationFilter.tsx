import { StyleSheet, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Select from './select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'
import Colors from '@/constants/Colors'

export const LocationFilter = ({ setLocation, visible, setVisible }: { setLocation: Dispatch<SetStateAction<string>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
    const locations = useLocation()
    console.log('visible', visible)
    return (
        <>
            {
                visible &&
                <View style={{ justifyContent: 'center', marginHorizontal: 20, }}>
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
                        handleChange={(value) => {
                            const city = value.split(',')[0]
                            value.length > 0 && setVisible(false)
                            setLocation(city)
                        }}
                        searchPlaceHolder='Search for a Location'
                        task={true}
                        buttonStyle={styles.taskStyles}
                    />
                </View>
            }
        </>
    )

}

const styles = StyleSheet.create(
    {
        taskStyles: {
            width: 180,
            height: 60,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: Colors.secondary,
            borderRadius: 40,
        },
    }
)

export const ServiceFilter = ({ setService, visible, setVisible }: { setService: Dispatch<SetStateAction<string>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
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
                        handleChange={(value) => {
                            value.length > 0 && setVisible(false)
                            setService(value)
                        }
                        }
                        defaultButtonText={'Service'}
                        profile={false}
                        task={true}
                        search={true}
                        buttonStyle={styles.taskStyles}
                    />
                </View>
            }
        </>
    )
}

export const AvailabilityFilter = ({ setAvailable, visible, setVisible }: { setAvailable: Dispatch<SetStateAction<boolean>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>
                    <Select
                        data={[{ label: 'Available', value: 'true' }, { label: 'Not Available', value: 'false' }]}
                        searchPlaceHolder='Availability'
                        handleChange={(value) => {
                            value.length > 0 && setVisible(false)
                            setAvailable(value === 'true' ? true : false)
                        }
                        }
                        defaultButtonText={'Availability'}
                        profile={false}
                        task={true}
                    />
                </View>
            }
        </>
    )
}