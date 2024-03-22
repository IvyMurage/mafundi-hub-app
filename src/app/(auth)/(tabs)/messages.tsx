import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DocumentData, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { useAuth } from '@/contexts/AuthContext'
import { Image } from 'expo-image'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loader from '@/components/loader'
import { setItemAsync } from 'expo-secure-store'
import MessageNotFound from '@/components/message-not-found'

const Messages = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)
    const { userState } = useAuth()
    const router = useRouter()
    useLayoutEffect(() => {
        let chatQuery;
        try {
            const queryRef = query(collection(FIREBASE_DB, 'messages'), orderBy("id", "desc"));
            userState?.user_role === 'client' ? chatQuery = query(queryRef, where('client', '==', userState?.user_id?.toString()))
                : chatQuery = query(queryRef, where('handyman', '==', userState?.user_id?.toString()));

            const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => (doc.data()));
                setMessages(messages);
                // Set loading to false after data retrieval
                setLoading(false);
            });

            return () => {
                unsubscribe();
            };
        } catch (error) {
            console.error('Firebase error:', error);
            // Consider showing an error message to the user
            setLoading(false); // Set loading to false in case of error
        }
    }, []);

    const renderMessage = ({ item }: { item: DocumentData }) => {
        return (
            <Pressable onPress={async () => {
                await setItemAsync('chatId', item.id)
                router.push('/(auth)/(screens)/chatApp')
            }} style={styles.chatBtn}>
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
            {
                !loading && messages.length === 0 && <MessageNotFound />
            }
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
        width: 50,
        height: 50,
        borderRadius: 50,
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
        marginHorizontal: 10,
        paddingHorizontal: 10,
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
        borderColor: Colors.secondary
    }
})

export default Messages