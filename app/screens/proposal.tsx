import { View, Text, Modal } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

const Proposal = (props: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {
    const { visible, setVisible } = props
    return (
        <Modal animationType='slide' visible={visible} transparent>
            <View>
                <Text>Proposal</Text>
            </View>
        </Modal>
    )
}

export default Proposal