import { View, Text, StyleSheet, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { DocumentData, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { getItemAsync } from 'expo-secure-store'
import CustomAlert from '@/components/customAlert'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const ChatApp = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const router = useRouter()
    const [message, setMessage] = useState<string>('')
    const { userState } = useAuth()
    const { handymanId } = useHandymanId()
    const [isError, setError] = useState(false)
    useLayoutEffect(() => {
        const getMessages = async () => {
            const chatId = await getItemAsync('docRefId')
            try {
                const msgCollectionRef = collection(FIREBASE_DB, 'messages', chatId!, 'chats')
                const q = query(msgCollectionRef, orderBy('createdAt', 'asc'))

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
            }
            catch {
                console.log('Firebase error')
            }
        }
        getMessages()
    }, [])

    const sendMessage = async (message: string) => {
        const chatId = await getItemAsync('docRefId')

        try {
            const msg = message.trim()
            if (msg.length === 0) return
            const _doc = {
                message: msg,
                chatId: chatId,
                senderId: userState?.user_id,
                receiverId: userState?.user_role === 'client' ? handymanId : null,
                createdAt: serverTimestamp()
            }
            const msgCollectionRef = doc(FIREBASE_DB, 'messages', chatId!)
            const chatRef = collection(msgCollectionRef, 'chats')
            await addDoc(chatRef, _doc)
            setMessage('')
        }
        catch (error) {
            setError(true)

            if (error) {
                <CustomAlert
                    message='Something went wrong'
                    visible={isError}
                    onClose={() => setError(false)
                    } />
            }
            console.log('Firebase error while sending messsage')
        }
    }

    const renderMessage = ({ item }: { item: DocumentData }) => {
        const isSender = item.senderId === userState?.user_id
        return (
            <View style={{ padding: 12 }}>
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
                }}>{new Date(
                    parseInt(item.createdAt?.seconds) * 1000
                ).toLocaleTimeString('en-US',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                    }</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.primary
        }}>
            <View style={styles.headerContainer}>
                <Ionicons name='arrow-back' size={24} color={Colors.lighter} onPress={() => router.back()} />
                <Image
                    source={{ uri: userState?.avatar_url! }}
                    placeholder={require('@/assets/images/placeholder.jpg')}
                    placeholderContentFit='cover'
                    style={styles.profile} />
            </View>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <FlatList data={messages} keyExtractor={(item) => item.id} renderItem={renderMessage} contentContainerStyle={{

                }} />
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: Colors.light,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: 100,
        backgroundColor: Colors.primary,
    },
    messageInput: {
        flex: 1,
        borderColor: 'black',
        padding: 10,
        marginRight: 10,
        color: 'black',
        letterSpacing: 1.2,
        fontSize: 14,
        borderRadius: 50,
        borderWidth: 1,
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: Colors.secondary,
        borderWidth: 1,
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
        fontSize: 14,
        backgroundColor: Colors.lighter
    }
})
export default ChatApp