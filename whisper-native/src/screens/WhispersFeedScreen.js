import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native'
import { WHISPERS, FILTERS } from '../data/whispers'
import { theme } from '../theme'
import TriggerBadge from '../components/TriggerBadge'

export default function WhispersFeedScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const groupByTime = (whispers) => {
    const groups = {}
    whispers.forEach((w) => {
      if (!groups[w.timeGroup]) {
        groups[w.timeGroup] = []
      }
      groups[w.timeGroup].push(w)
    })

    const order = ['Today', 'Yesterday', 'This Week', 'Earlier']
    const sections = order
      .filter((time) => groups[time])
      .map((time) => ({
        title: time,
        data: groups[time],
      }))

    return sections
  }

  const sections = groupByTime(WHISPERS)

  const renderItem = ({ item: whisper }) => (
    <TouchableOpacity
      style={[styles.feedItem, whisper.unread && styles.feedItemUnread]}
      onPress={() => navigation.navigate('VenueDetail', { venue: whisper.venue })}
    >
      <View style={styles.fiTop}>
        <TriggerBadge trigger={whisper.trigger} />
        <View style={styles.fiMeta}>
          <Text style={styles.fiTriggerName}>{whisper.trigger.label}</Text>
          <Text style={styles.fiTime}>{whisper.time}</Text>
        </View>
        {whisper.unread && <View style={styles.unreadDot} />}
      </View>

      {whisper.location && (
        <View style={styles.locationPill}>
          <Text style={styles.locationPillText}>📍 {whisper.location}</Text>
        </View>
      )}

      <Text style={styles.fiMessage}>{whisper.message}</Text>

      <View style={styles.fiVenueStrip}>
        <Text style={styles.venueName}>{whisper.venue.emoji} {whisper.venue.name}</Text>
        <Text style={styles.venueMeta}>{whisper.venue.meta}</Text>
        <Text style={styles.venueDist}>{whisper.venue.dist}</Text>
      </View>

      <View style={styles.fiContextBar}>
        <Text style={styles.fiContextText}>{whisper.context}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.timeGroupHeader}>{title}</Text>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Whispers</Text>
        <Text style={styles.feedSub}>{WHISPERS.length} discoveries</Text>
      </View>

      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filtersList}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: filter }) => (
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        )}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.feedList}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedHeader: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  feedTitle: {
    fontSize: 34,
    fontWeight: '300',
    color: theme.colors.text,
  },
  feedSub: {
    fontSize: 13,
    color: theme.colors.textDim,
    marginTop: theme.spacing.sm,
  },
  filtersList: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  filterPillActive: {
    backgroundColor: 'rgba(212, 168, 83, 0.13)',
    borderColor: 'rgba(212, 168, 83, 0.38)',
  },
  filterText: {
    fontSize: 12,
    color: theme.colors.textDim,
  },
  filterTextActive: {
    color: theme.colors.accent,
  },
  feedList: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 120,
    gap: theme.spacing.md,
  },
  timeGroupHeader: {
    fontSize: 12,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: theme.colors.muted,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  feedItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  feedItemUnread: {
    borderColor: 'rgba(212, 168, 83, 0.2)',
  },
  fiTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  fiMeta: {
    flex: 1,
  },
  fiTriggerName: {
    fontSize: 10,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    fontWeight: '500',
    marginBottom: 2,
  },
  fiTime: {
    fontSize: 11,
    color: theme.colors.muted,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing.sm,
  },
  locationPill: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(90, 127, 160, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(90, 127, 160, 0.25)',
    alignSelf: 'flex-start',
  },
  locationPillText: {
    fontSize: 10,
    color: '#8ab0cc',
    fontWeight: '500',
  },
  fiMessage: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  fiVenueStrip: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  venueName: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.text,
  },
  venueMeta: {
    fontSize: 12,
    color: theme.colors.textDim,
    marginTop: 2,
  },
  venueDist: {
    fontSize: 11,
    color: theme.colors.warm,
    marginTop: 4,
  },
  fiContextBar: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
    backgroundColor: 'rgba(212, 168, 83, 0.02)',
  },
  fiContextText: {
    fontSize: 11,
    color: theme.colors.muted,
    lineHeight: 15,
  },
})
