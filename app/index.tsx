import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { ResetButton } from '../components/ResetButton'
import { ScoreHalf } from '../components/ScoreHalf'
import { SettingsButton } from '../components/SettingsButton'
import { SettingsModal } from '../components/SettingsModal'
import { TimerToggle } from '../components/TimerToggle'
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
    scoreReleased: false,
  },
}

export default function ScoreScreen() {
  const [state, setState] = useState<AppState>(initialState)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useCountdown(state.game.running, setState)

  const saveSettings = (
    targetScore: number,
    scoreReleased: boolean,
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
        scoreReleased,
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
    setState((prev) => {
      const newScore = prev[team].score + 1
      const justReachedTarget = !prev.game.scoreReleased && newScore >= prev.game.targetScore
      return {
        ...prev,
        [team]: { ...prev[team], score: newScore },
        game: justReachedTarget ? { ...prev.game, running: false } : prev.game,
      }
    })
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

  const targetReached =
    state.teamA.score >= state.game.targetScore || state.teamB.score >= state.game.targetScore
  const decrementDisabled = !hasStarted
  const incrementDisabled = !hasStarted || (targetReached && !state.game.scoreReleased)

  return (
    <View style={styles.container}>
      <ScoreHalf
        name={state.teamA.name}
        score={state.teamA.score}
        onIncrement={() => incrementScore('teamA')}
        onDecrement={() => decrementScore('teamA')}
        incrementDisabled={incrementDisabled}
        decrementDisabled={decrementDisabled}
        isWinner={teamAWins}
        variant="dark"
        decrementOffset={18}
      />

      <View style={styles.bar}>
        <SettingsButton onPress={() => setSettingsVisible(true)} />
        <TimerToggle
          remainingTime={state.game.remainingTime}
          running={state.game.running}
          onPress={toggleTimer}
        />
        <ResetButton onPress={resetScores} />
      </View>

      <ScoreHalf
        name={state.teamB.name}
        score={state.teamB.score}
        onIncrement={() => incrementScore('teamB')}
        onDecrement={() => decrementScore('teamB')}
        incrementDisabled={incrementDisabled}
        decrementDisabled={decrementDisabled}
        isWinner={teamBWins}
        variant="light"
        decrementOffset={44}
      />

      <SettingsModal
        visible={settingsVisible}
        targetScore={state.game.targetScore}
        scoreReleased={state.game.scoreReleased}
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
  },
  bar: {
    height: 86,
    backgroundColor: '#ececec',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
  },
})
