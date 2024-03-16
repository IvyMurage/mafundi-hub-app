import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import { StyleSheet, } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type SelectProps = {
    data: { label: string; value: string }[];
    defaultButtonText: string;
    searchPlaceHolder: string;
    handleChange: (value: string) => void
    profile?: boolean,
    task: boolean,
    search?: boolean,
    name?: string
    buttonStyle?: any

}
const Select: React.FC<SelectProps> = (props) => {
    const { data, defaultButtonText, searchPlaceHolder, handleChange, profile, task, name = 'default', buttonStyle } = props
    function SelectIcon(props: {
        name: React.ComponentProps<typeof FontAwesome5>['name'];
        color: string;
        size: number
    }) {
        return <FontAwesome5 style={{ marginBottom: -3, textAlign: 'center' }} {...props} />;
    }
    return (
        <>
            {profile && name === 'service' && <MaterialIcons name="home-repair-service" size={24} color={Colors.primary} style={{
                left: 40,
                zIndex: 1
            }} />
            }
            <SelectDropdown
                data={data.map((item) => item.label)}
                onSelect={(selectedItem) => {
                    const value = data.find(item => item.label === selectedItem)?.value;
                    handleChange(value!.toString());
                }}
                showsVerticalScrollIndicator={true}
                defaultButtonText={defaultButtonText}
                searchPlaceHolder={searchPlaceHolder}
                dropdownIconPosition='right'
                renderDropdownIcon={() => <SelectIcon name='angle-down' color='rgba(69, 90, 100, 0.52)' size={20} />}
                renderSearchInputLeftIcon={() => <SelectIcon color='rgba(69, 90, 100, 0.52)' name='search' size={20} />}
                search
                buttonStyle={[buttonStyle]}
                buttonTextStyle={[selectStyles.dropdownButtonText]}
                rowTextStyle={selectStyles.dropDownText}
                dropdownStyle={selectStyles.dropDown}
            />
        </>
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
        borderRadius: 40,
        width: 350,
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
    },
    dropdownButtonText: {
        fontFamily: 'roboto',
        fontSize: 12,
        letterSpacing: 1.2,
        textAlign: 'left',

    },
    dropDownText: {
        fontFamily: 'roboto',
        fontSize: 12,
        letterSpacing: 1.8,
        textAlign: 'left',
    },
    dropDown: {
        width: 300,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10

    },
    selectContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Select