import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'


type SearchType = {
    placeholder: string,
    handleChange?: (search: string) => void

}
const Search: React.FC<SearchType> = (props) => {
    const [search, setSearch] = useState<string>('')
    const { placeholder, handleChange, } = props
    return (
        <View>
            <TextInput
                autoCapitalize='none'
                placeholder={placeholder}
                value={search}
                onChangeText={(text) => {
                    setSearch(text)
                    handleChange?.(text)
                }}
                style={[searchStyles.container]}
            />
            <FontAwesome5 name="search" size={20} color="rgba(0, 0, 0, .28)" style={[searchStyles.searchIcon]} />
        </View>

    )
}
const searchStyles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        fontFamily: 'roboto',
        fontSize: 14,
        letterSpacing: 1.2,
        padding: 10,
        paddingLeft: 48,
        borderRadius: 10,
        margin: 20,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchIcon: {
        position: 'absolute',
        top: 32,
        left: 40
    }
})
export default Search