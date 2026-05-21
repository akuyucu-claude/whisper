import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { theme } from '../theme'

export default function AudioStatusBar({ isSpeaking, venueName }) {
  const animationValue = React.useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    if (isSpeaking) {
      Animated.loop(Animated.sequence([
        Animated.timing(animationValue, { toValue: 1, duration: 300, useNativeDriver: false }),
        Animated.timing(animationValue, { toValue: 0, duration: 300, useNativeDriver: false }),
      ])).start()
    }
  }, [isSpeaking])

  return (
    <View style={styles.container}>
      <View style={styles.waveform}>
        {[1,2,3,4,5].map(i => (
          <View key={i} style={[styles.waveformBar, isSpeaking && styles.waveformBarSpeaking, { height: 4 + i * 3 }]} />
        ))}
      </View>
      {isSpeaking ? (
        <Text style={styles.statusText}>Speaking: <Text style={styles.venueName}>{venueName}</Text></Text>
      ) : (
        <Text style={styles.statusText}>Listening...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 200, left: theme.spacing.lg, right: theme.spacing.lg, backgroundColor: 'rgba(16,13,10,0.95)', borderWidth: 1, borderColor: 'rgba(200,169,110,0.15)', borderRadius: theme.borderRadius.md, paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10, zIndex: 15 },
  waveform: { flexDirection: 'row', gap: 2, alignItems: 'center', height: 16 },
  waveformBar: { width: 2, backgroundColor: theme.colors.accent, borderRadius: 1 },
  waveformBarSpeaking: { backgroundColor: theme.colors.green },
  statusText: { fontSize: 12, color: theme.colors.text, marginLeft: 6 },
  venueName: { fontWeight: '500', color: theme.colors.accent },
})
