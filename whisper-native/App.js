import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import AppNavigator from './src/navigation/AppNavigator'
import { theme } from './src/theme'

export default function App() {
  const [locationPermission, setLocationPermission] = useState(null)
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const requestLocationPermissions = async () => {
      try {
        const foregroundStatus = await Location.requestForegroundPermissionsAsync()
        const backgroundStatus = await Location.requestBackgroundPermissionsAsync()
        setLocationPermission({
          foreground: foregroundStatus.status,
          background: backgroundStatus.status,
        })
      } catch (error) {
        console.warn('Location permission error:', error)
      } finally {
        setAppReady(true)
      }
    }
    requestLocationPermissions()
  }, [])

  if (!appReady) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.ink }]} />
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
