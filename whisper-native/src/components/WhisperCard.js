import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../theme'
import TriggerBadge from './TriggerBadge'

export default function WhisperCard({ whisper, onDismiss, onVenuePress }) {
  if (!whisper) return null

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Trigger Header */}
        <View style={styles.triggerRow}>
          <View style={styles.triggerInfo}>
            <TriggerBadge trigger={whisper.trigger} />
            <View style={styles.triggerMeta}>
              <Text style={styles.triggerLabel}>{whisper.trigger.label}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onDismiss}>
            <Text style={styles.dismissIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* New Location Banner */}
        {whisper.location && (
          <View style={styles.newLocationBanner}>
            <Text style={styles.nlbIcon}>🌍</Text>
            <Text style={styles.nlbText}>
              You're in <Text style={styles.nlbPlace}>{whisper.location}</Text>
            </Text>
          </View>
        )}

        {/* Message */}
        <Text style={styles.message}>{whisper.message}</Text>

        {/* Venue Card */}
        <TouchableOpacity
          style={styles.venueCard}
          onPress={onVenuePress}
        >
          <View style={styles.venueLeft}>
            <Text style={styles.venueEmoji}>{whisper.venue.emoji}</Text>
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>{whisper.venue.name}</Text>
              <Text style={styles.venueMeta}>{whisper.venue.meta}</Text>
            </View>
          </View>
          <Text style={styles.venueDist}>{whisper.venue.dist}</Text>
        </TouchableOpacity>

        {/* Context */}
        <Text style={styles.context}>{whisper.context}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onVenuePress}
          >
            <Text style={styles.actionBtnText}>{whisper.action}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnGhost]}
            onPress={onDismiss}
          >
            <Text style={styles.actionBtnGhostText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  card: {
    backgroundColor: 'rgba(16, 13, 10, 0.97)',
    backdropFilter: 'blur(28px)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(200, 169, 110, 0.2)',
  },
  triggerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  triggerInfo: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flex: 1,
  },
  triggerMeta: {
    justifyContent: 'center',
  },
  triggerLabel: {
    fontSize: 10,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    fontWeight: '500',
  },
  dismissIcon: {
    fontSize: 16,
    color: theme.colors.muted,
    padding: 8,
  },
  newLocationBanner: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: 'rgba(90, 127, 160, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(90, 127, 160, 0.3)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  nlbIcon: {
    fontSize: 14,
  },
  nlbText: {
    fontSize: 11,
    color: '#8ab0cc',
    flex: 1,
  },
  nlbPlace: {
    fontWeight: '600',
    color: '#aaccee',
  },
  message: {
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 26,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  venueCard: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  venueLeft: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flex: 1,
    alignItems: 'center',
  },
  venueEmoji: {
    fontSize: 24,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 2,
  },
  venueMeta: {
    fontSize: 12,
    color: theme.colors.textDim,
  },
  venueDist: {
    fontSize: 12,
    color: theme.colors.warm,
    textAlign: 'right',
  },
  context: {
    fontSize: 10,
    color: theme.colors.muted,
    lineHeight: 15,
    marginBottom: theme.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.ink,
  },
  actionBtnGhost: {
    backgroundColor: theme.colors.surface3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  actionBtnGhostText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textDim,
  },
})