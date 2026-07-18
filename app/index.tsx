import { StyleSheet, Text, View } from 'react-native'

import type { AppState } from '../types'

const initialState: AppState = {
  teamA: { name: 'Time A', score: 0 },
  teamB: { name: 'Time B', score: 0 },
  game: {
    targetScore: 21,
    durationInMinutes: 7,
    remainingTime: 7 * 60,
    running: false,
  },
}

export default function ScoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        {initialState.teamA.name} {initialState.teamA.score} — {initialState.teamB.score} {initialState.teamB.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
