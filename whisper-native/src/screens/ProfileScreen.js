import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { INSIGHTS, TAGS } from '../data/whispers'
import { theme } from '../theme'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>Your taste and preferences</Text>
        </View>

        <View style={styles.insightGrid}>
          {INSIGHTS.map((insight, idx) => (
            <View key={idx} style={styles.insightCard}>
              <Text style={styles.insightIcon}>{insight.icon}</Text>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightValue}>{insight.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tagsSection}>
          <Text style={styles.tagsLabel}>Your Preferences</Text>
          <View style={styles.tasteTags}>
            {TAGS.map((tag, idx) => (
              <View
                key={idx}
                style={[
                  styles.tasteTag,
                  tag.s && styles.tasteTagStrong,
                ]}
              >
                <Text style={styles.tasteTagText}>{tag.t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>47</Text>
              <Text style={styles.statLabel}>Connected places</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLabel}>Whispers heard</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>5</Text>
              <Text style={styles.statLabel}>Saved venues</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLabel}>Sources</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: 34,
    fontWeight: '300',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textDim,
  },
  insightGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  insightCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: theme.spacing.sm,
  },
  insightIcon: {
    fontSize: 18,
  },
  insightTitle: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: theme.colors.muted,
  },
  insightValue: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 20,
  },
  tagsSection: {
    marginBottom: theme.spacing.lg,
  },
  tagsLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
  tasteTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tasteTag: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.round,
    backgroundColor: 'rgba(200, 169, 110, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(200, 169, 110, 0.18)',
  },
  tasteTagStrong: {
    backgroundColor: 'rgba(200, 169, 110, 0.16)',
    borderColor: 'rgba(200, 169, 110, 0.38)',
  },
  tasteTagText: {
    fontSize: 12,
    color: theme.colors.warm,
  },
  statsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: theme.spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  stat: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  statVal: {
    fontSize: 21,
    color: theme.colors.accent,
    fontWeight: '300',
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  settingsBtn: {
    width: '100%',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  settingsBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
})