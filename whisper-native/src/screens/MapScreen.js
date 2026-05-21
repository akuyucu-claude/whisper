import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import MapView, { Marker, Circle } from 'react-native-maps'
import { theme, darkMapStyle } from '../theme'
import useLocation from '../hooks/useLocation'
import useWhisperAudio from '../hooks/useWhisperAudio'
import useWhisperEngine from '../hooks/useWhisperEngine'
import { generateNearbyPlaces } from '../data/places'
import WhisperCard from '../components/WhisperCard'
import AudioStatusBar from '../components/AudioStatusBar'

const DEFAULT_LOCATION = { latitude: 40.7128, longitude: -74.006 }
const DISCOVERY_RADIUS = 500

export default function MapScreen({ navigation }) {
  const [airpodsEnabled, setAirpodsEnabled] = useState(true)
  const [mapReady, setMapReady] = useState(false)

  const { location, speed, heading, locationName, loading, getDistance } = useLocation(true)
  const { speak, stop, isSpeaking, spokenVenue } = useWhisperAudio()
  const { currentWhisper, dismissWhisper } = useWhisperEngine({
    location,
    speed,
    locationName,
    listening: airpodsEnabled && !loading,
    getDistance,
  })

  // Initialize places when we get first location
  useEffect(() => {
    if (location && !mapReady) {
      generateNearbyPlaces(location.latitude, location.longitude)
      setMapReady(true)
    }
  }, [location, mapReady])

  // Trigger speech when whisper arrives
  useEffect(() => {
    if (currentWhisper && airpodsEnabled && isSpeaking === false) {
      speak(currentWhisper.message, currentWhisper.venue.name)
    }
  }, [currentWhisper, airpodsEnabled, isSpeaking, speak])

  const currentLoc = location || DEFAULT_LOCATION
  const isLoading = loading && !mapReady

  const handleVenuePress = () => {
    if (currentWhisper) {
      navigation.navigate('VenueDetail', { venue: currentWhisper.venue })
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            customMapStyle={darkMapStyle}
            zoomEnabled={true}
            scrollEnabled={true}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            {/* Discovery radius circle */}
            <Circle
              center={{
                latitude: currentLoc.latitude,
                longitude: currentLoc.longitude,
              }}
              radius={DISCOVERY_RADIUS}
              fillColor="rgba(212, 168, 83, 0.08)"
              strokeColor="rgba(212, 168, 83, 0.15)"
              strokeWidth={2}
            />

            {/* User location marker */}
            <Marker
              coordinate={{
                latitude: currentLoc.latitude,
                longitude: currentLoc.longitude,
              }}
              title="Your Location"
              pinColor={theme.colors.accent}
            />
          </MapView>

          {/* Map header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.mapTitle}>Discover</Text>
              {locationName?.short && (
                <Text style={styles.mapLocation}>{locationName.short.toUpperCase()}</Text>
              )}
            </View>
            <TouchableOpacity
              style={[styles.airpodBtn, airpodsEnabled && styles.airpodBtnActive]}
              onPress={() => setAirpodsEnabled(!airpodsEnabled)}
            >
              <Text style={styles.airpodIcon}>🎧</Text>
              {airpodsEnabled && <View style={styles.liveDot} />}
            </TouchableOpacity>
          </View>

          {/* Audio status bar */}
          {isSpeaking && (
            <AudioStatusBar isSpeaking={isSpeaking} venueName={spokenVenue} />
          )}

          {/* Whisper card */}
          {currentWhisper && (
            <WhisperCard
              whisper={currentWhisper}
              onDismiss={dismissWhisper}
              onVenuePress={handleVenuePress}
            />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.ink,
  },
  loadingText: {
    marginTop: theme.spacing.lg,
    color: theme.colors.textDim,
    fontSize: 13,
  },
  header: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: theme.colors.text,
    marginBottom: 2,
  },
  mapLocation: {
    fontSize: 12,
    color: theme.colors.warm,
    letterSpacing: 0.3,
  },
  airpodBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: 'rgba(200, 169, 110, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  airpodBtnActive: {
    backgroundColor: 'rgba(212, 168, 83, 0.12)',
    borderColor: theme.colors.accent,
  },
  airpodIcon: {
    fontSize: 17,
  },
  liveDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.green,
    borderWidth: 2,
    borderColor: theme.colors.ink,
  },
})