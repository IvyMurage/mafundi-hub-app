import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Link,  useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GetStarted() {
    const router = useRouter()

    const handlePress = () => {
        router.replace('/(auth)/auth-options')
    }



    return (<>

        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            backgroundColor: Colors.primary,
        }}>
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={styles.title}>Welcome to</Text>
                    <Text style={styles.mafundi}>Mafundi <Text style={styles.hub}>Hub</Text></Text>
                </View>
                <Image style={{ width: 300, height: 300 }} source={require('@/assets/images/welcome-image.svg')} contentFit='cover' />

                <Link href={"/(auth)/auth-options"} >
                    <Pressable style={styles.startButton}>
                        <Text style={styles.buttonText} onPress={handlePress} >Get Started</Text>
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20

    },
    mafundi: {
        fontSize: 30,
        fontFamily: 'roboto-bold',
        letterSpacing: 3.6,
        color: Colors.secondary

    },
    hub: {
        color: Colors.lighter,
        fontFamily: 'roboto-bold',
        fontSize: 30,
        fontStyle: 'normal',
        letterSpacing: 3.6,
    },
    title: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        letterSpacing: 2.4,
        color: '#FEFEFE'

    },


    textView: {
        alignSelf: 'flex-start',
        paddingLeft: 10
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
        fontSize: 18,
        letterSpacing: 1.6,
        textAlign: 'center',
        fontFamily: 'roboto-bold',
    }
})