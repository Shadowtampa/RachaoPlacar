import { StyleSheet, Text, View } from 'react-native'

import { ScoreButton } from './ScoreButton'

type ScoreCardProps = {
  name: string
  score: number
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
  isWinner?: boolean
}

export function ScoreCard({ name, score, onIncrement, onDecrement, disabled, isWinner }: ScoreCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.crown}>{isWinner ? '👑' : ' '}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.buttons}>
        <ScoreButton label="-1" onPress={onDecrement} disabled={disabled} />
        <ScoreButton label="+1" onPress={onIncrement} disabled={disabled} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 8,
  },
  crown: {
    fontSize: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
})
