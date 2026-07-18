import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { PlayPauseButton } from '../components/PlayPauseButton'
import { ScoreCard } from '../components/ScoreCard'
import { Timer } from '../components/Timer'
import { useCountdown } from '../hooks/useCountdown'
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

  useCountdown(state.game.running, setState)

  const toggleTimer = () => {
    setState((prev) => {
      if (!prev.game.running && prev.game.remainingTime <= 0) return prev
      return { ...prev, game: { ...prev.game, running: !prev.game.running } }
    })
  }

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
      game: {
        ...prev.game,
        remainingTime: prev.game.durationInMinutes * 60,
        running: false,
      },
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreboard}>
        <ScoreCard
          name={state.teamA.name}
          score={state.teamA.score}
          onIncrement={() => incrementScore('teamA')}
          onDecrement={() => decrementScore('teamA')}
          disabled={!state.game.running}
        />

        <Pressable style={styles.resetButton} onPress={resetScores}>
          <Text style={styles.resetLabel}>Reset</Text>
        </Pressable>

        <ScoreCard
          name={state.teamB.name}
          score={state.teamB.score}
          onIncrement={() => incrementScore('teamB')}
          onDecrement={() => decrementScore('teamB')}
          disabled={!state.game.running}
        />
      </View>

      <View style={styles.timerSection}>
        <Timer remainingTime={state.game.remainingTime} />
        <PlayPauseButton running={state.game.running} onPress={toggleTimer} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scoreboard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 32,
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
