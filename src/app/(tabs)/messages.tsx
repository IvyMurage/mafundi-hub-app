import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { useAuth } from '@/contexts/AuthContext'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'


const Messages = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(false)
    const { userState } = useAuth()
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
            <View key={item.id}>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ab minus provident ducimus consequatur explicabo,
                    ullam quisquam voluptatibus dignissimos tempora,
                    laborum iure, doloremque sed doloribus a tenetur.
                    Eveniet voluptatum inventore aliquid.
                </Text>
            </View>
        )
    }
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text>Messages</Text>
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
            />
        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: Colors.secondary,
        borderWidth: 1,
    }
})

export default Messages