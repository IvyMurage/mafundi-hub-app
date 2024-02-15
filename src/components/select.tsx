import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
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
        <View style={profile && [selectStyles.selectContainer]}>

            {profile && <MaterialIcons name="location-pin" size={20} color={Colors.primary} style={{
                left: 45,
                zIndex: 1
            }} />
            }
            <SelectDropdown
                data={data.map((item) => item.label)}
                onSelect={(selectedItem) => {
                    const value = data.find(item => item.label === selectedItem)?.value;
                    handleChange(value!.toString());
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
                buttonTextStyle={[selectStyles.dropdownButtonText, profile && { padding: 15, paddingLeft: 34, }]}
                rowTextStyle={selectStyles.dropDownText}
                dropdownStyle={selectStyles.dropDown}
            />
        </View>
    )
}

const selectStyles = StyleSheet.create({
    taskStyles: {
        width: 180,
        height: 60,
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
        fontFamily: 'roboto',
        fontSize: 14,
        letterSpacing: 1.8,
        textAlign: 'left',

    },
    dropDownText: {
        fontFamily: 'roboto',
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

    },
    selectContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
})

export default Select