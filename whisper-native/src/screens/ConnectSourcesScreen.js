import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { SOURCES } from '../data/whispers'
import { theme } from '../theme'

export default function ConnectSourcesScreen({ navigation }) {
  const [connected, setConnected] = useState(new Set())
  const [connecting, setConnecting] = useState(new Set())

  const handleConnect = (sourceId) => {
    setConnecting((prev) => new Set([...prev, sourceId]))

    setTimeout(() => {
      setConnecting((prev) => {
        const next = new Set(prev)
        next.delete(sourceId)
        return next
      })
      setConnected((prev) => new Set([...prev, sourceId]))
    }, 1500)
  }

  const handleContinue = () => {
    if (connected.size >= 2) {
      navigation.navigate('TasteProfile')
    }
  }

  const progress = (connected.size / SOURCES.length) * 100

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.stepLabel}>STEP 1</Text>
          <Text style={styles.title}>Connect Sources</Text>
          <Text style={styles.subtitle}>Link your favorite place apps to understand your taste</Text>
        </View>

        <View style={styles.sourceList}>
          {SOURCES.map((source) => (
            <TouchableOpacity
              key={source.id}
              style={[
                styles.sourceCard,
                connected.has(source.id) && styles.sourceCardConnected,
                connecting.has(source.id) && styles.sourceCardConnecting,
              ]}
              onPress={() => !connected.has(source.id) && handleConnect(source.id)}
            >
              <View style={styles.iconBox}>
                <Text style={styles.sourceIcon}>{source.icon}</Text>
              </View>

              <View style={styles.sourceInfo}>
                <Text style={styles.sourceName}>{source.name}</Text>
                <Text style={styles.sourceDesc}>{source.desc}</Text>
                {connected.has(source.id) && (
                  <Text style={styles.sourceCount}>{source.count}</Text>
                )}
              </View>

              {connecting.has(source.id) ? (
                <View style={styles.spinner} />
              ) : connected.has(source.id) ? (
                <Text style={styles.sourceStatus}>✓</Text>
              ) : (
                <Text style={styles.sourceStatus}>→</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Connected</Text>
            <Text style={styles.progressText}>
              {connected.size} of {SOURCES.length}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.signalSummary}>
            <View style={styles.signalItem}>
              <Text style={styles.signalVal}>{connected.size}</Text>
              <Text style={styles.signalLabel}>Sources</Text>
            </View>
            <View style={styles.signalItem}>
              <Text style={styles.signalVal}>{(connected.size * 40).toFixed(0)}</Text>
              <Text style={styles.signalLabel}>Places</Text>
            </View>
            <View style={styles.signalItem}>
              <Text style={styles.signalVal}>
                {connected.size > 0 ? 'Strong' : 'Building'}
              </Text>
              <Text style={styles.signalLabel}>Signal</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, connected.size >= 2 && styles.continueBtnReady]}
          onPress={handleContinue}
          disabled={connected.size < 2}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
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
  sourceList: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sourceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sourceCardConnected: {
    borderColor: 'rgba(106, 158, 106, 0.35)',
    backgroundColor: 'rgba(106, 158, 106, 0.04)',
  },
  sourceCardConnecting: {
    borderColor: 'rgba(212, 168, 83, 0.3)',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceIcon: {
    fontSize: 20,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  sourceDesc: {
    fontSize: 12,
    color: theme.colors.textDim,
  },
  sourceCount: {
    fontSize: 12,
    color: theme.colors.green,
    fontWeight: '500',
    marginTop: 3,
  },
  sourceStatus: {
    fontSize: 18,
  },
  spinner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(212, 168, 83, 0.2)',
    borderTopColor: theme.colors.accent,
  },
  progressCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.12)',
    marginBottom: theme.spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    color: theme.colors.textDim,
    marginBottom: theme.spacing.md,
  },
  progressLabel: {
    fontSize: 12,
    color: theme.colors.textDim,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textDim,
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.surface3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 2,
  },
  signalSummary: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  signalItem: {
    gap: 2,
  },
  signalVal: {
    fontSize: 22,
    color: theme.colors.accent,
    fontWeight: '300',
  },
  signalLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  continueBtn: {
    width: '100%',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    opacity: 0.25,
  },
  continueBtnReady: {
    opacity: 1,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.ink,
    letterSpacing: 0.5,
  },
})
