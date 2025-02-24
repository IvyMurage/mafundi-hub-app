import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { AvailabilityFilter, LocationFilter, ServiceFilter } from './locationFilter'
import { useTask } from '@/contexts/TaskContext'
import Divider from './divider'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Filter = ({ setVisible, visible }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {
    const { location, setLocation, setServiceId, service_id, available, setAvailable } = useTask()
    return (
        <Modal animationType='fade' visible={visible} transparent>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Ionicons name="filter" size={24} color="rgba(0, 0, 0, .28)" />
                        <Text style={styles.headerText}>Filter</Text>
                        <Ionicons name="close-circle-outline" size={24} color="rgba(0, 0, 0, .28)" onPress={() => setVisible(!visible)} />
                    </View>

                    <Divider />
                    <View style={styles.filterContainer}>
                        <View style={styles.row1}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <LocationFilter
                                    setLocation={setLocation!}
                                    visible={true}
                                    setVisible={setVisible}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <ServiceFilter
                                    setService={setServiceId!}
                                    visible={true}
                                    setVisible={setVisible}
                                />
                            </View>
                        </View>
                        {/* <View style={{ marginTop: 20 }}>
                            <AvailabilityFilter
                                visible={true}
                                setVisible={setVisible}
                                setAvailable={setAvailable!}
                            />
                        </View> */}
                    </View>
                    <Pressable onPress={() => {
                        if (location) {
                            setLocation!('')
                        }
                        if (service_id) {
                            setServiceId!('')
                        }
                        if (available) {
                            setAvailable!(false)
                        }
                        setVisible(!visible)
                    }}
                        style={styles.clearBtn}>
                        <Text style={styles.clearText}>Clear Filter</Text>
                    </Pressable>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        flex: 4,
        marginTop: 25,
        paddingTop: 20,
        backgroundColor: Colors.lighter,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: 400
    },
    headerText: {
        fontFamily: 'roboto-bold',
        letterSpacing: 1.6,
        paddingBottom: 5,
        fontSize: 16,
        color: Colors.secondary,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    filterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    clearText: {
        textAlign: 'center',
        color: Colors.light,
        fontFamily: 'roboto-bold',
        fontSize: 14,
        letterSpacing: 1.4
    },
    clearBtn: {
        padding: 20,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        marginHorizontal: 20
    }
})

export default Filter