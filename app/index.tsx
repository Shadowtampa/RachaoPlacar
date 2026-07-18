import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { ScoreCard } from '../components/ScoreCard'
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
  const [state, setState] = useState<AppState>(initialState)

  const incrementScore = (team: 'teamA' | 'teamB') => {
    setState((prev) => ({
      ...prev,
      [team]: { ...prev[team], score: prev[team].score + 1 },
    }))
  }

  const decrementScore = (team: 'teamA' | 'teamB') => {
    setState((prev) => ({
      ...prev,
      [team]: { ...prev[team], score: Math.max(0, prev[team].score - 1) },
    }))
  }

  const resetScores = () => {
    setState((prev) => ({
      ...prev,
      teamA: { ...prev.teamA, score: 0 },
      teamB: { ...prev.teamB, score: 0 },
    }))
  }

  return (
    <View style={styles.container}>
      <ScoreCard
        name={state.teamA.name}
        score={state.teamA.score}
        onIncrement={() => incrementScore('teamA')}
        onDecrement={() => decrementScore('teamA')}
      />

      <Pressable style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetLabel}>Reset</Text>
      </Pressable>

      <ScoreCard
        name={state.teamB.name}
        score={state.teamB.score}
        onIncrement={() => incrementScore('teamB')}
        onDecrement={() => decrementScore('teamB')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  resetLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
})
