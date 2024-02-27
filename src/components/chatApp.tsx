import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { DocumentData, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const ChatApp = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [message, setMessage] = useState<string>('')
    const { userState } = useAuth()
    useLayoutEffect(() => {
        const msgCollectionRef = collection(FIREBASE_DB, 'messages')
        const q = query(msgCollectionRef, orderBy('createdAt', 'asc'), where('senderId', '==', userState?.user_id))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setMessages(messages)
        })
        return () => {
            unsubscribe()
        }
    })

    const sendMessage = async (message: string) => {
        console.log('sending message')
        const msg = message.trim()
        if (msg.length === 0) return
        const msgCollectionRef = collection(FIREBASE_DB, 'messages')
        await addDoc(msgCollectionRef, {
            message: msg,
            senderId: userState?.user_id,
            receiverId: '',
            createdAt: serverTimestamp()
        })
        setMessage('')
    }

    const renderMessage = ({ item }: { item: DocumentData }) => {
        const isSender = item.sender === userState?.user_id
        return (
            <View>
                <View style={[styles.messageContainer, isSender ? styles.userMessageContainer : styles.otherUserMessage]}>
                    <Text style={{
                        color: isSender ? Colors.lighter : Colors.dark,
                        fontSize: 14,
                        letterSpacing: 1.2,
                        fontFamily: 'roboto'
                    }}>{item.message}</Text>
                </View>
                <Text style={{
                    color: Colors.dark,
                    fontSize: 12,
                    letterSpacing: 1.2,
                    fontFamily: 'roboto',
                    textAlign: isSender ? 'right' : 'left',
                    padding: 10,
                }}>{item.createdAt?.toDate().toLocaleDateString()}</Text>

            </View>

        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList data={messages} keyExtractor={(item) => item.id} renderItem={renderMessage} />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.messageInput}
                        placeholder="Type a message"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        multiline
                    />
                    {
                        message.length > 0 &&
                        <Pressable onPress={() => sendMessage(message)}>
                            <FontAwesome
                                name="send"
                                size={18}
                                color={Colors.lighter}
                                style={styles.sendBtn} />
                        </Pressable>
                    }
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginRight: 10,
        color: 'black',
        letterSpacing: 1.2,
        fontSize: 14,
        borderRadius: 50,
    },
    sendBtn: {
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 50,
    },
    messageContainer: {
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },

    userMessageContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignSelf: 'flex-end',
        fontSize: 14,
        color: Colors.lighter
    },
    otherUserMessage: {
        color: Colors.dark,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        fontSize: 14,
        backgroundColor: Colors.lighter
    }
})
export default ChatApp