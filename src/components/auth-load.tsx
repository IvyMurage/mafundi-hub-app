import { View,  StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bounce } from 'react-native-animated-spinkit'
import Colors from '@/constants/Colors'

const AuthLoad = ({ isLoading }: { isLoading: Boolean }) => {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => clearTimeout(timeout); // Cleanup the timeout on unmount

    }, [visible, setVisible])
    console.log(isLoading)
    return (
        <>
            {
                isLoading && visible &&
                (<View style={[StyleSheet.absoluteFillObject, {
                    flex: 1,
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }]}>
                    <Bounce size={48} color={Colors.secondary} animating />
                </View>
                )
            }
        </>
    )
}

export default AuthLoad