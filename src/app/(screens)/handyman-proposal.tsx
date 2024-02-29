import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const HandymanProposals = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Ionicons name='arrow-back' color={Colors.lighter} size={24} style={{ marginLeft: 18, marginTop: 30 }} />
            <View style={{ backgroundColor: Colors.lighter, marginTop: 60, height: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                <View>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontFamily: 'roboto-bold', letterSpacing: 1.8, color: Colors.dark, padding: 20 }}>Proposals</Text>

                    <ScrollView style={{
                        flexGrow: 1,
                        height: '100%',
                    }}>

                        <View style={{
                            backgroundColor: Colors.light,
                            marginHorizontal: 10,
                            borderRadius: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <Text style={{ fontSize: 12, fontFamily: 'roboto-bold', letterSpacing: 1.8, color: Colors.dark, textAlign: 'left', padding: 10 }}>Job Title</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'roboto', fontWeight: '600', letterSpacing: 1.8, backgroundColor: Colors.primary, color: Colors.lighter, borderRadius: 20, textAlign: 'justify', padding: 10 }}>Proposal Status</Text>
                            </View>

                            <Text style={{ fontSize: 12, fontFamily: 'roboto', fontWeight: '600', letterSpacing: 1.8, lineHeight: 24, color: Colors.dark, textAlign: 'justify', padding: 10 }}>Introduction:
                                I am embarking on a home renovation project that involves various carpentry tasks, including constructing custom furniture, installing built-in shelves, and repairing damaged woodwork.
                                I am seeking a carpenter who has the expertise and attention to detail required to bring my vision to life.
                                Scope of Work:
                                The scope of work for this project includes:
                                Constructing custom furniture pieces to fit specific dimensions and design preferences.
                                Installing built-in shelves and storage solutions to maximize space and functionality.
                                Repairing any damaged woodwork, including doors, trim, and cabinetry, to restore the integrity and aesthetics of the space.</Text>
                        </View>

                        <View style={{
                            backgroundColor: Colors.light,
                            marginHorizontal: 10,
                            borderRadius: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            marginVertical: 20
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <Text style={{ fontSize: 12, fontFamily: 'roboto-bold', letterSpacing: 1.8, color: Colors.dark, textAlign: 'left', padding: 10 }}>Job Title</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'roboto', fontWeight: '600', letterSpacing: 1.8, backgroundColor: Colors.primary, color: Colors.lighter, borderRadius: 20, textAlign: 'justify', padding: 10 }}>Proposal Status</Text>
                            </View>

                            <Text style={{ fontSize: 12, fontFamily: 'roboto', fontWeight: '600', letterSpacing: 1.8, lineHeight: 24, color: Colors.dark, textAlign: 'justify', padding: 10 }}>Introduction:
                                I am embarking on a home renovation project that involves various carpentry tasks, including constructing custom furniture, installing built-in shelves, and repairing damaged woodwork.
                                I am seeking a carpenter who has the expertise and attention to detail required to bring my vision to life.
                                Scope of Work:
                                The scope of work for this project includes:
                                Constructing custom furniture pieces to fit specific dimensions and design preferences.
                                Installing built-in shelves and storage solutions to maximize space and functionality.
                                Repairing any damaged woodwork, including doors, trim, and cabinetry, to restore the integrity and aesthetics of the space.</Text>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HandymanProposals