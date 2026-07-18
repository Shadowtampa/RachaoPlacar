import { StyleSheet, Text } from 'react-native'

import { formatTime } from '../utils/formatTime'

type TimerProps = {
  remainingTime: number
}

export function Timer({ remainingTime }: TimerProps) {
  return <Text style={styles.label}>{formatTime(remainingTime)}</Text>
}

const styles = StyleSheet.create({
  label: {
    fontSize: 40,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
})
