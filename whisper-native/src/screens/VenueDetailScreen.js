import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { theme } from '../theme'

export default function VenueDetailScreen({ route, navigation }) {
  const { venue } = route.params

  const handleBack = () => {
    navigation.goBack()
  }

  const stats = [
    { label: 'Rating', value: '4.8' },
    { label: 'Distance', value: venue.dist },
  ]

  const whyReasons = [
    `Matches your ${venue.name} taste profile`,
    'Local-only venues in your history',
    'Off-the-path discovery style',
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{venue.emoji}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Name & Type */}
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueType}>{venue.meta}</Text>

        {/* Stats */}
        <View style={styles.venueStats}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.stat}>
              <Text style={styles.statVal}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.venueDesc}>
          A hidden gem discovered through your location and taste preferences. This venue
          represents the kind of authentic, undiscovered place you're drawn to.
        </Text>

        {/* Match Bars */}
        <View style={styles.matchBar}>
          <Text style={styles.matchLabel}>Your Match</Text>

          <View style={styles.matchRow}>
            <Text style={styles.matchKey}>Vibe</Text>
            <View style={styles.matchTrack}>
              <View style={[styles.matchFill, { width: '85%' }]} />
            </View>
            <Text style={styles.matchPct}>85%</Text>
          </View>

          <View style={styles.matchRow}>
            <Text style={styles.matchKey}>Type</Text>
            <View style={styles.matchTrack}>
              <View style={[styles.matchFill, { width: '92%' }]} />
            </View>
            <Text style={styles.matchPct}>92%</Text>
          </View>

          <View style={styles.matchRow}>
            <Text style={styles.matchKey}>Quality</Text>
            <View style={styles.matchTrack}>
              <View style={[styles.matchFill, { width: '78%' }]} />
            </View>
            <Text style={styles.matchPct}>78%</Text>
          </View>
        </View>

        {/* Why Card */}
        <View style={styles.whyCard}>
          <Text style={styles.whyLabel}>Why This Place</Text>
          {whyReasons.map((reason, idx) => (
            <View key={idx} style={styles.whyItem}>
              <Text style={styles.whyIcon}>✓</Text>
              <Text style={styles.whyText}>{reason}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTA Bar */}
      <View style={styles.ctaBar}>
        <TouchableOpacity style={styles.ctaPrimary} onPress={handleBack}>
          <Text style={styles.ctaPrimaryText}>Explore on Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaSecondary}>
          <Text style={styles.ctaSecondaryText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    height: 250,
    backgroundColor: theme.colors.surface2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 72,
    position: 'relative',
    paddingBottom: 60,
  },
  heroEmoji: {
    fontSize: 72,
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 12, 10, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backIcon: {
    fontSize: 18,
    color: theme.colors.text,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: theme.spacing.lg,
    paddingBottom: 140,
  },
  venueName: {
    fontSize: 34,
    fontWeight: '400',
    color: theme.colors.text,
    marginBottom: 3,
    lineHeight: 40,
  },
  venueType: {
    fontSize: 13,
    color: theme.colors.warm,
    letterSpacing: 0.3,
    marginBottom: theme.spacing.lg,
  },
  venueStats: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  stat: {
    gap: 2,
  },
  statVal: {
    fontSize: 21,
    color: theme.colors.accent,
    fontWeight: '300',
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  venueDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textDim,
    marginBottom: theme.spacing.lg,
  },
  matchBar: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.13)',
  },
  matchLabel: {
    fontSize: 10,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    marginBottom: theme.spacing.md,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  matchKey: {
    fontSize: 12,
    color: theme.colors.textDim,
    width: 60,
  },
  matchTrack: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.surface3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  matchFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 2,
  },
  matchPct: {
    fontSize: 12,
    color: theme.colors.muted,
    width: 28,
    textAlign: 'right',
  },
  whyCard: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.accent,
  },
  whyLabel: {
    fontSize: 10,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    marginBottom: theme.spacing.md,
  },
  whyItem: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'flex-start',
  },
  whyIcon: {
    fontSize: 14,
    color: theme.colors.green,
    marginTop: 2,
  },
  whyText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textDim,
    lineHeight: 18,
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    backgroundColor: 'rgba(26, 23, 20, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  ctaPrimary: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  ctaPrimaryText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.ink,
    letterSpacing: 0.5,
  },
  ctaSecondary: {
    width: 52,
    height: 52,
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    fontSize: 20,
  },
  ctaSecondaryText: {
    fontSize: 20,
  },
})
