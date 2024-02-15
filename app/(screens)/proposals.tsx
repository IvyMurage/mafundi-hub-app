import { View, Text, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Animated, { FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { FontAwesome, Octicons } from '@expo/vector-icons';

const Proposal = (props: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {
    const { visible, setVisible } = props
    return (
        <Animated.View entering={FadeOutUp} exiting={FadeOutDown} style={{
        }}>
            <Modal animationType='slide' visible={visible} transparent>
                <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <ScrollView style={{
                        width: '100%',
                        height: '100%',
                    }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1,
                            flexDirection: "column",
                            width: "100%",
                            paddingBottom: 50,
                            marginTop: 25,
                            paddingTop: 20,
                            paddingHorizontal: 10,
                            backgroundColor: Colors.lighter,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}>

                            <Text style={{
                                fontFamily: 'roboto-bold',
                                letterSpacing: 1.4,
                                paddingBottom: 5,
                                fontSize: 16,
                                color: Colors.secondary,
                                textAlign: 'center',
                            }}>Proposals</Text>
                            <Octicons name='x-circle' size={20} color={Colors.primary} onPress={() => {
                                setVisible(!visible)
                            }} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </Animated.View >

    )
}
const proposalStyle = StyleSheet.create({
    container: {
        flex: 1,

    }
})
export default Proposal