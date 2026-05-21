import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { theme } from '../theme'

export default function TriggerBadge({ trigger }) {
  if (!trigger) return null

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: trigger.color, borderColor: trigger.borderColor },
      ]}
    >
      <Text style={styles.icon}>{trigger.icon}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    width: 34,
    height: 34,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  icon: {
    fontSize: 16,
  },
})
