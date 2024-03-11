import { View, StyleSheet, Text } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { LocationProvider, MapPropType } from '@/contexts/LocationContext'
import { getItemAsync } from 'expo-secure-store'
import { Stack, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const MapsView = () => {
    return (<>
        <Stack.Screen name='(screens)/maps' options={{
            headerShown: true,
            animation: 'fade',
            headerTitle: 'Maps',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Colors.lighter, fontFamily: 'roboto-medium', },
            headerTintColor: Colors.lighter,
        }} />

        <LocationProvider>
            <Maps />
        </LocationProvider>
    </>

    )
}

const Maps = () => {
    const [regions, setRegions] = useState<MapPropType[]>([])
    const router = useRouter()

    const KENYA_COORDINATES = {
        latitude: 1.2921,
        longitude: 36.8219,
    }

    const KENYA_DELTA = {
        latitudeDelta: 8,
        longitudeDelta: 8,
    }

    const getLocations = async () => {
        const locations = await getItemAsync('locations')
        console.log("This is the locations", locations)
        if (locations) {
            setRegions(JSON.parse(locations)?.map((location: MapPropType) => {
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
        }
    }
    useEffect(() => {
        getLocations()
    }, [])

    const mapRef = useRef<MapView | null>(null)

    const markerSelected = (location: MapPropType) => {
        mapRef.current?.animateToRegion({
            latitude: location.latitude!,
            longitude: location.longitude!,
            latitudeDelta: location.latitudeDelta!,
            longitudeDelta: location.longitudeDelta!
        })
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 12 }}>
                <Ionicons name='arrow-back' size={24} color={Colors.lighter} onPress={() => { router.back() }} />
                <Text style={{ color: Colors.lighter, fontFamily: 'roboto-medium', alignSelf: 'center' }}>Maps</Text>
            </View>
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
                    regions?.map((location, index) => <Marker key={index} coordinate={location!} onPress={() => markerSelected(location)}>
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