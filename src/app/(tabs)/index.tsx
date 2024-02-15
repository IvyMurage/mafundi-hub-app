import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ClientHome from '../(screens)/client-home'
import HandymaJobs from '../(screens)/handyman-jobs'

const Page = () => {
  const { userState } = useAuth()
  return (
    <>
      {userState?.user_role === 'client' ? (<>
        <ClientHome />
      </>
      ) : (
        <>
          <HandymaJobs />
        </>
      )}
    </>
  )
}

export default Page
