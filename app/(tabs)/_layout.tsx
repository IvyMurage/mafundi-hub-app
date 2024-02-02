import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';


import Colors from '@/constants/Colors';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Octicons } from '@expo/vector-icons';

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
          margin: 'auto'

        },
        tabBarInactiveTintColor: Colors.dark,
        tabBarLabelStyle: {
          fontFamily: 'poppins-semibold',
          fontSize: 10,
          letterSpacing: 1.2,
          textAlign: 'center',
          fontWeight: '400',
          marginTop: 5
        }
      }}>

      <Tabs.Screen name='index'
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <TabBarIcon name="home" color={color} size={size} />,
        }}

      />

      <Tabs.Screen name='profile'
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            fontFamily: 'poppins-medium',
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
    fontFamily: 'poppins-medium',
    letterSpacing: 1.8
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
})
