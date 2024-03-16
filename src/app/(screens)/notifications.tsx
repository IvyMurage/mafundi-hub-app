import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Loader from '@/components/loader';
import CustomAlert from '@/components/customAlert';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { request } from '@/utils/executePostRequest';

type AppointmentType = {
    id: number;
    appointment_date: string;
    task_name: string;
    appointment_status: string;
    handyman_name: string;
    handyman_id: number;
    job_proposal_id: number;
}
const Appointments = () => {
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState<AppointmentType[]>([])
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
                            id: appointment.id,
                            appointment_date: appointment.appointment_date,
                            task_name: appointment.task_name,
                            appointment_status: appointment.appointment_status,
                            handyman_name: appointment.handyman_name,
                            handyman_id: appointment.handyman_id,
                            job_proposal_id: appointment.job_proposal_id
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
            setAppointments(prevState => prevState.filter(appointment => appointment.id !== id))
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    const handleUpdate = async (item: AppointmentType, status: string) => {
        console.log('item:', item)
        setLoading(true)
        try {
            const { response, data } = await request('PATCH', JSON.stringify({ appointment_status: status }), `appointments/${item.id}/update`, authState?.token!)

            if (response.ok) {
                setAppointments(prevState => prevState.map(appointment => {
                    if (appointment.id === data.id) { return data }
                    return appointment
                }))
            }
            if (!response.ok) {
                throw new Error(data.error)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const renderAppointments = (item: AppointmentType) => {
        const textColor = item?.appointment_status === 'scheduled' ? Colors.lighter : item.appointment_status === 'confirmed' ? Colors.lighter : null
        const backgroundColor = item?.appointment_status === 'scheduled' ? Colors.primary : item.appointment_status === 'confirmed' ? Colors.secondary : Colors.lighter
        const scheduled = item?.appointment_status === 'scheduled' ? Colors.secondary : item.appointment_status === 'confirmed' ? Colors.primary : 'red'
        const border = item?.appointment_status === 'scheduled' ? Colors.secondary : item.appointment_status === 'confirmed' ? Colors.primary : null
        return (
            <View style={[styles.appointmentView, { backgroundColor: backgroundColor!, borderColor: border! }]}>
                <Ionicons name="calendar-number-outline" size={24} color={textColor!} style={{ paddingRight: 12 }} />
                <View >
                    <Text style={[{ fontFamily: 'roboto-bold', letterSpacing: 1.2, color: textColor! }]}>{item.task_name}</Text>
                    <Text style={[styles.fontStyle, { color: textColor! }]}>{item.handyman_name}</Text>
                    <Text style={[styles.fontStyle, { color: textColor! }]}>{item.appointment_date}</Text>
                    <Text style={[styles.fontStyle, { color: scheduled }]}>{item.appointment_status}</Text>
                </View>

                <Menu style={{ alignSelf: 'flex-start' }}>
                    <MenuTrigger
                        style={{
                            padding: 5,
                            paddingHorizontal: 10,
                        }}>
                        <Ionicons name='chevron-forward' size={20} color={item.appointment_status === 'canceled' ? Colors.secondary : Colors.lighter} />
                    </MenuTrigger>
                    <MenuOptions customStyles={
                        {
                            optionsContainer: {
                                backgroundColor: 'white',
                                padding: 5,
                                borderRadius: 5,
                                width: 100,
                            }
                        }
                    }>
                        <MenuOption style={{ width: 100, }} onSelect={() => {
                            handleUpdate(item, 'confirmed')
                        }}>
                            <Text style={{
                                padding: 5,
                                paddingHorizontal: 10,
                                fontFamily: 'roboto-bold'
                            }} >Confirmed</Text>
                        </MenuOption>
                        <MenuOption style={{ width: 100, }} onSelect={() => {
                            handleUpdate(item, 'canceled')
                        }}>
                            <Text style={{
                                padding: 5,
                                paddingHorizontal: 10,
                                fontFamily: 'roboto-bold'
                            }} >Canceled</Text>
                        </MenuOption>
                        <MenuOption style={{ width: 100, }} onSelect={() => {
                            handleDelete(item.id)
                        }}>
                            <Text style={{
                                padding: 5,
                                paddingHorizontal: 10,
                                fontFamily: 'roboto-bold'
                            }} >Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
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
        borderLeftWidth: 5,
        maxHeight: 200,
        borderLeftColor: Colors.secondary,
        marginBottom: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        paddingVertical: 10
    },
    fontStyle: {
        fontFamily: 'roboto', letterSpacing: 1.2
    },
    header: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 1.4,
        marginBottom: 10
    }
})
export default Appointments