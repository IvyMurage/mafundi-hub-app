import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import ClientHome from '../screens/client-home'

const Page = () => {
  const { userState } = useAuth()
  return (
    <>
      {userState?.user_role === 'client' ? (<>
        <ClientHome />
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
