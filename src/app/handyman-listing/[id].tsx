import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { HandymanProps } from '@/types/handyman'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'

const Handyman = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { authState } = useAuth()
    const [loading, setLoading] = useState(false)
    const [handyman, setHandyman] = useState<HandymanProps>({} as HandymanProps)

    useEffect(() => {
        const getHandyman = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${id}/show`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                setHandyman({ ...data, location_attributes: `${data.location?.city}, ${data.location?.county} ` })
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoading(false)
            }
        }
        getHandyman()
    }, [])

    const handymanSkills = handyman.handyman_skills?.map((skill: string) => {
        return (
            <View key={skill} style={styles.handymanSkillContainer}>
                <Text style={styles.handymanSkillText}>{skill}</Text>
            </View>
        )
    })

    const workPictures = handyman.media_url?.map((picture: string, index) => {
        return (
            <View key={index} style={styles.mediaContainer}>
                <Image source={{ uri: picture }} style={styles.mediaImage} contentFit='cover' />
            </View>
        )
    })
    return (
        <SafeAreaView style={styles.safeView}>
            <Octicons name='arrow-left' size={20} color={Colors.lighter} style={{ paddingHorizontal: 12, }} onPress={() => router.back()} />
            <View style={styles.containerHeader}>
                <Image source={{ uri: handyman?.avatar_url }} placeholder={require('@/assets/images/placeholder.jpg')} placeholderContentFit='cover' style={styles.profileStyle} />
                <Octicons name="dot-fill" size={24} color={handyman.availability ? 'green' : 'red'} style={styles.iconStyle} />
            </View>
            <ScrollView style={styles.scrollView} >
                <View style={styles.conatiner}>

                    <View style={styles.subConatiner}>
                        <View style={styles.nameConatiner}>
                            <Text style={styles.nameText}>{handyman.first_name} {handyman.last_name}</Text>
                            <Text style={styles.titleText}>{handyman.title}</Text>
                            <Text style={styles.titleText}>{handyman.location_attributes}</Text>
                        </View>

                        <Pressable style={styles.appointmentBtn} onPress={() => { router.push(`/appointment-form`) }}>
                            <Text style={styles.appointmentTextStyle}>Book Appointment</Text>
                        </Pressable>

                        <ScrollView horizontal contentContainerStyle={{ marginTop: 10, }}>
                            {handymanSkills}
                        </ScrollView>

                        <View style={styles.bioContainer}>
                            <Text style={styles.bioHeader}>Bio</Text>
                            <Text style={styles.bioDescription}>{handyman.description}</Text>
                        </View>

                        <Text style={styles.imageHeader}>Images</Text>

                        <ScrollView horizontal={true} style={{ width: '100%', alignSelf: 'flex-start', }} contentContainerStyle={styles.imageScroll}>
                            {workPictures}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: Colors.primary,
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginTop: 60,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    containerHeader: {
        width: '100%',
        alignItems: 'center',
        top: 70,
        zIndex: 1,
    },
    conatiner: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    subConatiner: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    nameConatiner: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    nameText: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        paddingVertical: 5
    },
    titleText: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto-medium',
        paddingVertical: 5
    },
    appointmentBtn: {
        width: '50%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        marginTop: 10
    },
    appointmentTextStyle: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        color: Colors.lighter
    },
    bioContainer: {
        width: '100%',
        padding: 10,
        alignSelf: 'flex-start'
    },
    bioHeader: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
    },
    bioDescription: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto',
    },
    imageHeader: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    imageScroll: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    iconStyle: {
        position: 'absolute',
        right: '42%',
        top: 30,
        zIndex: 1
    },
    profileStyle: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    handymanSkillContainer: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: Colors.lighter,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    handymanSkillText: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto-medium',
        textAlign: 'justify'
    },
    mediaContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        width: 150,
        height: 100,
        marginHorizontal: 10,
    },
    mediaImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
    }
})

export default Handyman