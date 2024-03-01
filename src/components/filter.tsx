import { View, Text, StyleSheet, Modal } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { LocationFilter, ServiceFilter } from './locationFilter'
import { useTask } from '@/contexts/TaskContext'
import Divider from './divider'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Filter = ({ setVisible, visible }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {
    const { location, setLocation, setServiceId, service_id } = useTask()
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
                        <LocationFilter
                            setLocation={setLocation!}
                            visible={true}
                        />

                        <ServiceFilter
                            setService={setServiceId!}
                            visible={true}
                        />
                    </View>

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
        flex: 1,
        marginTop: 25,
        paddingTop: 20,
        backgroundColor: Colors.lighter,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    }
})

export default Filter