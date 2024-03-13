import { View, Text, SafeAreaView, SectionList, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Loader from '@/components/loader';


type AppointmentType = {
    id: number;
    appointment_date: string;
    task_name: string;
    appointment_status: string;
    handyman_name: string;
    handyman_id: number;
}
const Appointments = () => {
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const { userState, authState } = useAuth()
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/appointments?client_id=${userState?.user_id}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })

                const data = await response.json()
                console.log('response:', data)

                if (response.ok) {
                    setAppointments(data?.appointment?.map((appointment: AppointmentType) => {
                        return {
                            appointment_id: appointment.id,
                            appointment_date: appointment.appointment_date,
                            task_name: appointment.task_name,
                            appointment_status: appointment.appointment_status,
                            handyman_name: appointment.handyman_name,
                            handyman_id: appointment.handyman_id
                        }
                    }))
                }
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchAppointments()
    }, [authState, userState])
    console.log('appointments:', appointments)
    const renderAppointments = (item: AppointmentType) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 4, maxHeight: 200, borderLeftColor: Colors.secondary, marginBottom: 10, paddingHorizontal: 12 }}>
                <Ionicons name="calendar-number-outline" size={24} color="black" style={{ paddingRight: 12 }} />
                <View style={{}}>
                    <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1.2 }}>{item.task_name}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2 }}>{item.handyman_name}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2 }}>{item.appointment_date}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2, color: Colors.secondary }}>{item.appointment_status}</Text>
                </View>
                <Ionicons name="pencil" size={20} color={Colors.secondary} style={{ alignSelf: 'flex-start' }} />
            </View>

        )
    }
    return (<>
        <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 14 }}>
            <View>
                <Text style={{ fontSize: 20, fontFamily: 'roboto-bold', letterSpacing: 1.4, marginBottom: 10 }}>Appointments</Text>
            </View>
            <View style={{ width: '100%', paddingBottom: 20 }}>
                <FlatList
                    data={appointments ?? []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => renderAppointments(item)}
                />
            </View>
        </SafeAreaView>
        <Loader isLoading={loading} />
    </>


    )
}


export default Appointments