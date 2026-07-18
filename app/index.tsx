import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { PlayPauseButton } from '../components/PlayPauseButton'
import { ScoreCard } from '../components/ScoreCard'
import { SettingsButton } from '../components/SettingsButton'
import { SettingsModal } from '../components/SettingsModal'
import { Timer } from '../components/Timer'
import { useCountdown } from '../hooks/useCountdown'
import type { AppState } from '../types'

const TIMER_TEST = process.env.EXPO_PUBLIC_TIMER_TEST === 'true'
const TIMER_TEST_SECONDS = 3

const resolveRemainingTime = (durationInMinutes: number) =>
  TIMER_TEST ? TIMER_TEST_SECONDS : durationInMinutes * 60

const initialState: AppState = {
  teamA: { name: 'Com Camisa', score: 0 },
  teamB: { name: 'Sem Camisa', score: 0 },
  game: {
    targetScore: 12,
    durationInMinutes: 7,
    remainingTime: resolveRemainingTime(7),
    running: false,
    scoreLocked: false,
  },
}

export default function ScoreScreen() {
  const [state, setState] = useState<AppState>(initialState)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useCountdown(state.game.running, setState)

  const saveSettings = (
    targetScore: number,
    scoreLocked: boolean,
    durationInMinutes: number,
    teamAName: string,
    teamBName: string,
  ) => {
    setState((prev) => ({
      ...prev,
      teamA: { ...prev.teamA, name: teamAName },
      teamB: { ...prev.teamB, name: teamBName },
      game: {
        ...prev.game,
        targetScore,
        scoreLocked,
        durationInMinutes,
        remainingTime: resolveRemainingTime(durationInMinutes),
        running: false,
      },
    }))
    setHasStarted(false)
    setSettingsVisible(false)
  }

  const toggleTimer = () => {
    setState((prev) => {
      if (!prev.game.running && prev.game.remainingTime <= 0) return prev
      return { ...prev, game: { ...prev.game, running: !prev.game.running } }
    })
    if (state.game.remainingTime > 0) setHasStarted(true)
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

  const timeUp = state.game.remainingTime <= 0
  const teamAWins =
    state.teamA.score >= state.game.targetScore ||
    (timeUp && state.teamA.score > state.teamB.score)
  const teamBWins =
    state.teamB.score >= state.game.targetScore ||
    (timeUp && state.teamB.score > state.teamA.score)

  const resetScores = () => {
    setHasStarted(false)
    setState((prev) => ({
      ...prev,
      teamA: { ...prev.teamA, score: 0 },
      teamB: { ...prev.teamB, score: 0 },
      game: {
        ...prev.game,
        remainingTime: resolveRemainingTime(prev.game.durationInMinutes),
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
          disabled={!hasStarted || state.game.scoreLocked}
          isWinner={teamAWins}
        />

        <View style={styles.centerColumn}>
          <SettingsButton onPress={() => setSettingsVisible(true)} />
          <Pressable style={styles.resetButton} onPress={resetScores}>
            <Text style={styles.resetLabel}>Reset</Text>
          </Pressable>
        </View>

        <ScoreCard
          name={state.teamB.name}
          score={state.teamB.score}
          onIncrement={() => incrementScore('teamB')}
          onDecrement={() => decrementScore('teamB')}
          disabled={!hasStarted || state.game.scoreLocked}
          isWinner={teamBWins}
        />
      </View>

      <View style={styles.timerSection}>
        <Timer remainingTime={state.game.remainingTime} />
        <PlayPauseButton running={state.game.running} onPress={toggleTimer} />
      </View>

      <SettingsModal
        visible={settingsVisible}
        targetScore={state.game.targetScore}
        scoreLocked={state.game.scoreLocked}
        durationInMinutes={state.game.durationInMinutes}
        teamAName={state.teamA.name}
        teamBName={state.teamB.name}
        teamAWonLastRound={teamAWins}
        teamBWonLastRound={teamBWins}
        onSave={saveSettings}
        onClose={() => setSettingsVisible(false)}
      />
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
  centerColumn: {
    alignItems: 'center',
    gap: 16,
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
