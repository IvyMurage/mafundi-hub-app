import { View, StyleSheet, Text } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { TaskProvider, useTask } from '@/contexts/TaskContext'
import Loader from '@/components/loader'



const MapsView = () => {
    return (
        <TaskProvider>
            <Maps />
        </TaskProvider>
    )
}
type MapPropType = {
    city: string;
    country: string;
    county: string,
    latitude: number,
    longitude: number,
    longitudeDelta: number,
    latitudeDelta: number
}


const Maps = () => {
    const KENYA_COORDINATES = {
        latitude: 1.2921,
        longitude: 36.8219,
    }

    const KENYA_DELTA = {
        latitudeDelta: 8,
        longitudeDelta: 8,
    }

    const [regions, setRegions] = useState<MapPropType[]>([])
    const { locations, getMyJobs, loading } = useTask()
    useEffect(() => {
        getMyJobs!()
    }, [])


    useEffect(() => {
        setRegions(locations?.map((location) => {
            return {
                city: location.city,
                country: location.country,
                county: location.county,
                latitude: location.latitude!,
                longitude: location.longitude!,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01
            }
        }) || [])
    }, [locations])
    console.log('locations', regions)

    const mapRef = useRef<MapView | null>(null)

    const markerSelected = (location: MapPropType) => {
        mapRef.current?.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta
        })
    }
    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    ...KENYA_COORDINATES,
                    ...KENYA_DELTA
                }}
                showsMyLocationButton
                ref={mapRef}
            >
                {
                    regions?.map((location, index) => <Marker key={index} coordinate={location} onPress={() => markerSelected(location)}>
                        <Callout tooltip>
                            <View>
                                <View>
                                    <Text>{location.city}</Text>
                                </View>
                                <View>
                                    <Text>{location.county}</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>)
                }

            </MapView>
            <Loader isLoading={loading!} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
})
export default MapsView