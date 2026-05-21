import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { INSIGHTS, TAGS } from '../data/whispers'
import { theme } from '../theme'

export default function TasteProfileScreen({ navigation }) {
  const handleContinue = () => {
    navigation.replace('MainTabs')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.stepLabel}>STEP 2</Text>
          <Text style={styles.title}>Your Taste</Text>
          <Text style={styles.subtitle}>
            We learned what you love. Whisper will find hidden gems matching your style.
          </Text>
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

        <View style={styles.aiInsight}>
          <Text style={styles.aiLabel}>AI Insight</Text>
          <Text style={styles.aiText}>
            You're drawn to authentic, undiscovered places — the kind that reveal themselves slowly.
            Whisper will speak gently about places that match this sensibility.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Start Discovering</Text>
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
    marginTop: theme.spacing.lg,
  },
  stepLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textDim,
    lineHeight: 18,
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
  aiInsight: {
    backgroundColor: theme.colors.surface2,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.accent,
    borderRadius: 0,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  aiLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: theme.colors.warm,
    marginBottom: theme.spacing.md,
  },
  aiText: {
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 24,
    color: theme.colors.textDim,
  },
  button: {
    width: '100%',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.ink,
    letterSpacing: 0.5,
  },
})
