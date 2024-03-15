import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Loader from '@/components/loader';
import CustomAlert from '@/components/customAlert';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

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
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/appointments?client_id=${userState?.user_id}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
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

                if (!response.ok) {
                    let error
                    if (data && data.errors) {
                        error = data.errors
                    }
                    else {
                        error = "Error fetching appointments"
                    }
                    throw new Error(error)

                }
                setLoading(false)
            } catch (error: any) {
                setError(error.message)
                setVisible(true)
            }
            finally {
                setLoading(false)
            }
        }
        fetchAppointments()
    }, [authState, userState])


    const handleDelete = async (id: number) => {
        setLoading(true)
        try {
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}/appointments/${id}/destroy`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authState?.token}`
                }
            })
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    const handleUpdate = (id: number) => { }
    const renderAppointments = (item: AppointmentType) => {
        return (
            <View style={styles.appointmentView}>
                <Ionicons name="calendar-number-outline" size={24} color="black" style={{ paddingRight: 12 }} />
                <View style={{}}>
                    <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1.2 }}>{item.task_name}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2 }}>{item.handyman_name}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2 }}>{item.appointment_date}</Text>
                    <Text style={{ fontFamily: 'roboto', letterSpacing: 1.2, color: Colors.secondary }}>{item.appointment_status}</Text>
                </View>
                <Ionicons name="pencil" size={20} color={Colors.secondary} style={{ alignSelf: 'flex-start' }} onPress={() => handleUpdate(item.id)} />
                <Ionicons name="trash" size={20} color={Colors.secondary} style={{ alignSelf: 'flex-start' }} onPress={() => handleDelete(item.id)} />
            </View>
        )
    }
    return (<>
        <SafeAreaView style={styles.safeareaview}>
            <View>
                <Text style={styles.header}>Appointments</Text>
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
        <CustomAlert visible={visible} message={error} onClose={() => setVisible(false)} />
    </>
    )
}

const styles = StyleSheet.create({
    safeareaview: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 14
    },
    appointmentView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        maxHeight: 200,
        borderLeftColor: Colors.secondary,
        marginBottom: 10,
        paddingHorizontal: 12
    },
    header: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.4,
        marginBottom: 10
    }
})
export default Appointments