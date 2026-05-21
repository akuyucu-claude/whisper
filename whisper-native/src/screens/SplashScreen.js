import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { theme } from '../theme'

export default function SplashScreen({ navigation }) {
  const handleBegin = () => {
    navigation.navigate('ConnectSources')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        <View style={styles.top}>
          <Text style={styles.globe}>🌍</Text>
          <Text style={styles.logo}>Whisper</Text>
          <Text style={styles.tagline}>Discover extraordinary places through the places you love</Text>

          <View style={styles.proofList}>
            <View style={styles.proofItem}>
              <Text style={styles.proofIcon}>📍</Text>
              <View>
                <Text style={styles.proofText}>
                  <Text style={styles.proofBold}>Works offline</Text> — GPS + local database
                </Text>
              </View>
            </View>

            <View style={styles.proofItem}>
              <Text style={styles.proofIcon}>🎧</Text>
              <View>
                <Text style={styles.proofText}>
                  <Text style={styles.proofBold}>AirPods ready</Text> — Seamless audio discovery
                </Text>
              </View>
            </View>

            <View style={styles.proofItem}>
              <Text style={styles.proofIcon}>🚶</Text>
              <View>
                <Text style={styles.proofText}>
                  <Text style={styles.proofBold}>Always aware</Text> — Background location tracking
                </Text>
              </View>
            </View>

            <View style={styles.proofItem}>
              <Text style={styles.proofIcon}>🔇</Text>
              <View>
                <Text style={styles.proofText}>
                  <Text style={styles.proofBold}>Ambient feel</Text> — No notifications, just whispers
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBegin}>
          <Text style={styles.buttonText}>Begin</Text>
        </TouchableOpacity>

        <Text style={styles.anywhere}>
          <Text style={styles.anywhereEmoji}>🌐</Text> Works anywhere you go
        </Text>
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
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'center',
  },
  globe: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  logo: {
    fontSize: 52,
    fontWeight: '300',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '300',
    color: theme.colors.textDim,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xxl,
  },
  proofList: {
    gap: theme.spacing.md,
    width: '100%',
    marginBottom: theme.spacing.xxl,
  },
  proofItem: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  proofIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  proofText: {
    fontSize: 13,
    color: theme.colors.textDim,
    lineHeight: 18,
  },
  proofBold: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.ink,
    letterSpacing: 0.5,
  },
  anywhere: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.muted,
  },
  anywhereEmoji: {
    marginRight: 6,
  },
})