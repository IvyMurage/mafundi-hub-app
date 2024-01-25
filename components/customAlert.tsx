import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AlertProps {
    visible: boolean;
    message: string;
    onClose: () => void
}

const CustomAlert: React.FC<AlertProps> = ({ visible, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
    },
    alertMessage: {
        fontSize: 14,
        fontFamily: 'poppins',
        letterSpacing: 1.2,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: Colors.lighter,
        fontWeight: 'bold',
        fontFamily: 'poppins',
        letterSpacing: 1.2,
    },
});

export default CustomAlert;
