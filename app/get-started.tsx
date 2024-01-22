import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from "@/components/Themed";
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';

export default function GetStarted() {
    const router = useRouter()

    const handlePress = () => {
        router.push('/(modals)/login')
    }
    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.mafundi}>Mafundi <Text style={styles.hub}>Hub</Text></Text>
            </View>
            <Image style={{ width: 200, height: 200 }} source={require('@/assets/images/welcome-image.svg')} />

            <Link href={"/(modals)/login"} >
                <Pressable style={styles.startButton}>
                    <Text style={styles.buttonText} onPress={handlePress} >Get Started</Text>
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontFamily: 'poppins',
        backgroundColor: Colors.primary,
        padding: 15
    },
    mafundi: {
        fontSize: 30,
        fontFamily: 'poppins-bold',
        fontWeight: '700',
        letterSpacing: 2.16,
        color: Colors.secondary

    },
    hub: {
        color: Colors.lighter,
        fontFamily: 'poppins',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 3.6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 2.16,
        color: '#FEFEFE'

    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    textView: {
        alignSelf: 'flex-start',
        paddingLeft: 30
    },

    startButton: {
        borderRadius: 5,
        height: 55,
        width: 336,
        backgroundColor: Colors.secondary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#fffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,

    },
    buttonText: {
        color: Colors.lighter,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1.6,
        textAlign: 'center',
        fontFamily: 'poppins-semibold',
    }
})