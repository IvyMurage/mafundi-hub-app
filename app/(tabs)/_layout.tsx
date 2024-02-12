import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';


import Colors from '@/constants/Colors';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter()
  const { userState } = useAuth()

  const handleBack = () => {
    router.back()
  }

  const handleRight = () => {
    setVisible(true)
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,

        tabBarStyle: {
          backgroundColor: Colors.lighter,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 70,
          padding: 5,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 0,
        },
        tabBarItemStyle: {
          width: 50,
          height: 50,
          margin: 'auto',

        },
        tabBarInactiveTintColor: Colors.dark,
        tabBarLabelStyle: {
          fontFamily: 'roboto-medium',
          fontSize: 10,
          letterSpacing: 1.2,
          textAlign: 'center',
          fontWeight: '400',
          marginTop: 5
        }
      }}>

      <Tabs.Screen name='index'
        options={{
          headerShown: userState?.user_role === 'client' ? false : true,
          tabBarLabel: "Home",
          headerTitle: `${userState?.user_role === 'client' ? null : 'Mafundi Jobs'}`,
          headerTitleStyle: {
            fontFamily: 'roboto-medium',
            fontSize: 16,
            letterSpacing: 1.8,
            color: Colors.lighter,
            textAlign: 'center',
          },
          headerStyle: userState?.user_role === 'client' ? null : { ...headerStyles.headerStyle },
          headerLeft: () => (
            <Pressable onPress={handleBack} style={{ paddingLeft: 10 }} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </Pressable>
          ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="home" color={color} size={size} />,
        }}

      />
      <Tabs.Screen name='jobs'
        options={{
          headerShown: true,
          headerTitle: 'My Jobs',
          headerTitleStyle: {
            fontFamily: 'roboto-medium',
            fontSize: 16,
            letterSpacing: 1.8,
            color: Colors.lighter,
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerStyle: { ...headerStyles.headerStyle },
          headerRight: () => (
            <Pressable onPress={() => router.push('/(tabs)/')} style={{ paddingRight: 10 }} >
              <MaterialIcons name='add-circle'
                size={24}
                color={Colors.lighter}
                style={{ right: 10 }} />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={handleBack} style={{ paddingLeft: 10 }} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </Pressable>
          ),
          tabBarLabel: "Jobs",
          tabBarIcon: ({ color, size }) => <TabBarIcon name="briefcase" color={color} size={size} />,
        }}
      />

<Tabs.Screen name='proposals'
        options={{
          headerShown: true,
          headerTitle: 'Proposals',
          headerTitleStyle: {
            fontFamily: 'roboto-medium',
            fontSize: 16,
            letterSpacing: 1.8,
            color: Colors.lighter,
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerStyle: { ...headerStyles.headerStyle },
     
          headerLeft: () => (
            <Pressable onPress={handleBack} style={{ paddingLeft: 10 }} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </Pressable>
          ),
          tabBarLabel: "Proposals",
          tabBarIcon: ({ color, size }) => <TabBarIcon name="envelope" color={color} size={size} />,
        }}
      />

      <Tabs.Screen name='profile'
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            fontFamily: 'roboto-medium',
            fontSize: 16,
            letterSpacing: 1.8,
            color: Colors.lighter,
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerStyle: { ...headerStyles.headerStyle },

          headerLeft: () => (
            <Pressable onPress={handleBack} style={{ paddingLeft: 10 }} >
              <Octicons name='arrow-left'
                size={24}
                color={Colors.lighter}
                style={{ left: 10 }} />
            </Pressable>
          ),
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => <TabBarIcon name="user-circle-o" color={color} size={size} />,
        }}
      />

    </Tabs>
  );
}
const headerStyles = StyleSheet.create({
  headerRight: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'roboto-medium',
    letterSpacing: 1.8
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
})
