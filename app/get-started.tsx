import { Button, StyleSheet } from 'react-native';

import { Text, View } from "@/components/Themed";

export default function GetStarted() {
    return (
        <View style={styles.container}>
            <Text>Welcome to</Text>
            <Text>Mafundi Hub</Text>


            <Button title="Get Started" onPress={() => console.log('Get Started')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})