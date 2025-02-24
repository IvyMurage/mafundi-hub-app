import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
type LoaderProps = {
    isLoading: boolean,
    backgroundColor?: string
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { isLoading, backgroundColor = 'rgba(0,0,0,0.5)' } = props
    return (
        isLoading &&
        (<View style={[StyleSheet.absoluteFillObject, {
            flex: 1,
            backgroundColor: backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }]}>
            <ActivityIndicator color={"#fff"} animating size='large' />

        </View>)

    )
}

export default Loader