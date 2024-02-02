import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TaskForm from '../(modals)/task-form'
import { useAuth } from '@/context/AuthContext'
import ClientHome from '../screens/client-home'

const Page = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { userState } = useAuth()
  return (
    <>
      {userState?.user_role === 'client' ? (<>
        {/* <Text onPress={() => setIsVisible(!isVisible)}>Create task</Text> */}
        <ClientHome />
        <TaskForm isVisible={isVisible} setIsVisible={setIsVisible} />
      </>
      ) : (
        <View>
          <Text>Handyman Home</Text>
        </View>
      )}
    </>
  )
}

export default Page
