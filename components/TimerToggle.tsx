import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

import { formatTime } from '../utils/formatTime'

type TimerToggleProps = {
  remainingTime: number
  running: boolean
  onPress: () => void
  orientation: 'portrait' | 'landscape'
}

export function TimerToggle({ remainingTime, running, onPress, orientation }: TimerToggleProps) {
  const isLandscape = orientation === 'landscape'

  return (
    <Pressable style={[styles.pill, isLandscape && styles.pillLandscape]} onPress={onPress}>
      {isLandscape 
      ? (
        <View style={styles.timeLandscapeBox}>
          <Text style={styles.timeLandscapeText}>{formatTime(remainingTime)}</Text>
        </View>
      ) : 
      (
        <Text style={styles.time}>{formatTime(remainingTime)}</Text>
      )}
      {running ? (
        <Svg width={14} height={16} viewBox="0 0 14 16">
          <Rect x={1.5} y={1.5} width={3.6} height={13} rx={1} fill="#111" />
          <Rect x={8.9} y={1.5} width={3.6} height={13} rx={1} fill="#111" />
        </Svg>
      ) : (
        <Svg width={14} height={16} viewBox="0 0 14 16">
          <Path d="M1.5 1.5v13l11.5-6.5z" fill="#111" />
        </Svg>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#111',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  pillLandscape: {
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  time: {
    fontSize: 27,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#111',
    fontVariant: ['tabular-nums'],
  },
  timeLandscapeBox: {
    width: 28,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

  },
  timeLandscapeText: {
    width: 76,
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#111',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    transform: [{ rotate: '90deg' }],
  },
})
