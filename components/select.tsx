import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type SelectProps = {
    data: { label: string; value: string }[];
    defaultButtonText: string;
    searchPlaceHolder: string;
    handleChange: (value: string) => void
    profile: boolean,
    task: boolean

}
const Select: React.FC<SelectProps> = (props) => {
    const { data, defaultButtonText, searchPlaceHolder, handleChange, profile, task } = props
    function SelectIcon(props: {
        name: React.ComponentProps<typeof FontAwesome5>['name'];
        color: string;
        size: number
    }) {
        return <FontAwesome5 style={{ marginBottom: -3, textAlign: 'center' }} {...props} />;
    }
    return (
        <View>
            <SelectDropdown
                data={data.map((item) => item.label)}
                onSelect={(selectedItem) => {
                    const value = data.find(item => item.label === selectedItem)?.value;
                    handleChange(value!.toString());
                    console.log(value)
                }}

                defaultButtonText={defaultButtonText}
                searchPlaceHolder={searchPlaceHolder}
                dropdownIconPosition='right'
                renderDropdownIcon={() => <SelectIcon name='angle-down' color='rgba(69, 90, 100, 0.52)' size={20} />}
                renderSearchInputLeftIcon={() => <SelectIcon color='rgba(69, 90, 100, 0.52)' name='search' size={20} />}
                search
                buttonStyle={[
                    selectStyles.selectButtonStyle,
                    { borderBottomWidth: profile ? 1 : 0, borderWidth: profile ? 0 : 1 },
                    task ? selectStyles.taskStyles : null]}
                buttonTextStyle={selectStyles.dropdownButtonText}
                rowTextStyle={selectStyles.dropDownText}
                dropdownStyle={selectStyles.dropDown}
            />
        </View>
    )
}

const selectStyles = StyleSheet.create({
    taskStyles: {
        width: 180,
        backgroundColor: 'transparent',
    },
    selectButtonStyle: {
        backgroundColor: Colors.light,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 8,
        width: 357,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdownButtonText: {
        fontFamily: 'poppins',
        fontSize: 14,
        letterSpacing: 1.8,
        textAlign: 'left'
    },
    dropDownText: {
        fontFamily: 'poppins',
        fontSize: 14,
        letterSpacing: 1.8,
        textAlign: 'left'

    },
    dropDown: {
        width: 357,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10

    }
})

export default Select