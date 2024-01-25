import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'


type SearchType = {
    search: string,
    placeholder: string

}
const Search: React.FC<SearchType> = (props) => {
    const { placeholder } = props
    return (
        <View>
            <TextInput
                autoCapitalize='none'
                placeholder={placeholder}
                style={[searchStyles]}
            />
        </View>

    )
}
const searchStyles = StyleSheet.create({

})
export default Search