import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from '../theme'

// Screens
import SplashScreen from '../screens/SplashScreen'
import ConnectSourcesScreen from '../screens/ConnectSourcesScreen'
import TasteProfileScreen from '../screens/TasteProfileScreen'
import MapScreen from '../screens/MapScreen'
import WhispersFeedScreen from '../screens/WhispersFeedScreen'
import SavedScreen from '../screens/SavedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import VenueDetailScreen from '../screens/VenueDetailScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: theme.colors.ink },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen name="ConnectSources" component={ConnectSourcesScreen} />
      <Stack.Screen name="TasteProfile" component={TasteProfileScreen} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(14, 12, 10, 0.95)',
          borderTopColor: 'rgba(255, 255, 255, 0.05)',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 4,
          height: 84,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textDim,
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 4,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{
          title: 'Discover',
          tabBarLabel: 'DISCOVER',
          tabBarIcon: ({ color }) => <MapIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="FeedTab"
        component={WhispersFeedScreen}
        options={{
          title: 'Whispers',
          tabBarLabel: 'WHISPERS',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          title: 'Saved',
          tabBarLabel: 'SAVED',
          tabBarIcon: ({ color }) => <SavedIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.ink },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="VenueDetail"
        component={VenueDetailScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const [isOnboarded, setIsOnboarded] = useState(false)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.ink },
      }}
    >
      {!isOnboarded ? (
        <Stack.Screen
          name="Onboarding"
          options={{ animationEnabled: false }}
        >
          {() => (
            <OnboardingStack />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Main"
          options={{ animationEnabled: false }}
        >
          {() => <MainStack />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  )
}

// Simple icon components
function MapIcon({ color }) {
  return <Text style={{ color, fontSize: 22 }}>🗺️</Text>
}

function FeedIcon({ color }) {
  return <Text style={{ color, fontSize: 22 }}>✨</Text>
}

function SavedIcon({ color }) {
  return <Text style={{ color, fontSize: 22 }}>❤️</Text>
}

function ProfileIcon({ color }) {
  return <Text style={{ color, fontSize: 22 }}>👤</Text>
}

import { Text } from 'react-native'
