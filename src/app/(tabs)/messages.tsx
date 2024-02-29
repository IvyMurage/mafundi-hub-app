import { View, Text, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'


const Messages = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(false)

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
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Messages