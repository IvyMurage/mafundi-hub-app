import { View, Text, Modal } from 'react-native'
import React from 'react'

const handleExeception = ({ error }: { error: string | string[] }) => {
  return (
    <Modal animationType='slide' style={{
      backgroundColor: 'red',
      padding: 20,
      margin: 20,
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      width: '100%',
    }}>
      <View>
        {typeof error === 'object' && error.map(err => <Text>{err}</Text>)}
        {typeof error === 'string' && <Text>{error}</Text>}
      </View>
    </Modal>
  )
}


export default handleExeception