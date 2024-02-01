import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TaskForm from '../(modals)/task-form'

const Page = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <>
      <View>
        <Text onPress={() => setIsVisible(!isVisible)}>Create task</Text>
      </View>
      <TaskForm isVisible={isVisible} />
    </>
  )
}

export default Page
