import { createPostInputSchema } from '@pkstack/api'
import { trimMessages } from '@pkstack/ai'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const sampleDraft = createPostInputSchema.parse({
  title: 'Ship the mobile client',
  content: 'Shared API contracts keep the app and web scaffold aligned.',
})

const sampleMessages = trimMessages(
  [
    { role: 'system', content: 'You are working inside pkstack mobile.' },
    { role: 'user', content: 'Summarize the current handoff.' },
    { role: 'assistant', content: 'Stage 2 is extracting packages and adding mobile/docs.' },
  ],
  2
)

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>pkstack mobile</Text>
        <Text style={styles.title}>Expo starter for the Stage 2 stack</Text>
        <Text style={styles.body}>
          This template consumes shared pkstack packages instead of duplicating transport contracts in
          the mobile client.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shared API contract</Text>
          <Text style={styles.cardBody}>Sample draft title: {sampleDraft.title}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Agent helper</Text>
          <Text style={styles.cardBody}>
            `trimMessages` kept {sampleMessages.length} recent message(s) for the next step.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4efe7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 18,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#7a503a',
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: '#23160f',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5d4738',
  },
  card: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#fffaf3',
    borderWidth: 1,
    borderColor: '#ddc5b0',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#23160f',
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5d4738',
  },
})
