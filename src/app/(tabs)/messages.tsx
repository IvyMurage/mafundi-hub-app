import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { useAuth } from '@/contexts/AuthContext'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loader from '@/components/loader'


const Messages = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(false)
    const { userState } = useAuth()
    const router = useRouter()
    useLayoutEffect(() => {
        try {
            setLoading(true)
            const chatQuery = query(
                collection(FIREBASE_DB, 'messages'),
                orderBy("id", "desc")
            )

            const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => (doc.data()))
                setMessages(messages)
            })
            return () => {
                unsubscribe()
            }
        }
        catch {
            console.log('Firebase error')
        }
        finally {
            setLoading(false)
        }
    }, [])

    // console.log("messages", messages)

    const renderMessage = ({ item }: { item: DocumentData }) => {
        return (
            <Pressable onPress={() => router.push('/(screens)/chatApp')} style={styles.chatBtn}>
                <View style={styles.icon}>
                    <FontAwesome5 name="users" size={24} color={Colors.primary} />
                </View>

                <View key={item.id} style={styles.textContainer}>
                    <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab minus provident ducimus consequatur explicabo...
                    </Text>
                    <Text style={[styles.text, { color: Colors.secondary, fontFamily: 'roboto-bold', alignSelf: 'flex-end' },]}>{item.createdAt?.toDate().toLocaleDateString()}</Text>
                </View>
            </Pressable>

        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Ionicons name='arrow-back' size={24} color={Colors.lighter} onPress={() => router.back()} />
                <Text style={styles.headerText}>Messages</Text>
                <Image
                    source={{ uri: userState?.avatar_url! }}
                    placeholder={require('@/assets/images/placeholder.jpg')}
                    placeholderContentFit='cover'
                    style={styles.profile} />
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            />
            <Loader isLoading={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: 150,
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    headerText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        letterSpacing: 1.8,
        color: Colors.lighter,
    },
    textContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal:10
    },
    text: {
        fontFamily: 'roboto',
        fontSize: 12,
        letterSpacing: 1.4,
        color: Colors.primary,
        textAlign: 'justify'
    },
    chatBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 10,
        padding: 30,
        paddingLeft: 20,
        width: '100%',
        paddingVertical: 10
    },
    icon: {
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,

    }
})

export default Messages