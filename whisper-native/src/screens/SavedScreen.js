import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native'
import { theme } from '../theme'

export default function SavedScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.ink }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Places</Text>
        <Text style={styles.subtitle}>Your collection of discovered venues</Text>
      </View>
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>❤️</Text>
        <Text style={styles.emptyText}>No saved places yet</Text>
        <Text style={styles.emptySubtext}>Discover places on the map and save your favorites here</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xxl },
  title: { fontSize: 34, fontWeight: '300', color: theme.colors.text },
  subtitle: { fontSize: 13, color: theme.colors.textDim, marginTop: theme.spacing.sm },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xxxl },
  emptyIcon: { fontSize: 48, marginBottom: theme.spacing.lg },
  emptyText: { fontSize: 17, fontWeight: '300', color: theme.colors.text, marginBottom: theme.spacing.sm },
  emptySubtext: { fontSize: 13, color: theme.colors.textDim, textAlign: 'center', lineHeight: 18 },
})
