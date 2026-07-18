import { Pressable, StyleSheet, Text, View } from 'react-native'

type DecrementPosition = {
  bottom: number
  left?: number
  right?: number
}

type ScoreHalfProps = {
  name: string
  score: number
  onIncrement: () => void
  onDecrement: () => void
  incrementDisabled?: boolean
  decrementDisabled?: boolean
  isWinner?: boolean
  variant: 'dark' | 'light'
  orientation: 'portrait' | 'landscape'
  decrementPosition: DecrementPosition
}

export function ScoreHalf({
  name,
  score,
  onIncrement,
  onDecrement,
  incrementDisabled,
  decrementDisabled,
  isWinner,
  variant,
  orientation,
  decrementPosition,
}: ScoreHalfProps) {
  const isDark = variant === 'dark'
  const isLandscape = orientation === 'landscape'

  return (
    <Pressable
      style={[styles.half, isDark ? styles.dark : styles.light]}
      onPress={onIncrement}
      disabled={incrementDisabled}
    >
      <Text style={styles.crown}>{isWinner ? '👑' : ' '}</Text>
      <Text style={[styles.name, isDark ? styles.nameDark : styles.nameLight]}>{name}</Text>
      <Text
        style={[
          styles.score,
          isLandscape && styles.scoreLandscape,
          isDark ? styles.scoreDark : styles.scoreLight,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {score}
      </Text>

      <Pressable
        style={[
          styles.decrementButton,
          isDark ? styles.decrementButtonDark : styles.decrementButtonLight,
          decrementPosition,
        ]}
        onPress={(event) => {
          event.stopPropagation()
          onDecrement()
        }}
        disabled={decrementDisabled}
      >
        <Text style={[styles.decrementLabel, isDark ? styles.decrementLabelDark : styles.decrementLabelLight]}>
          −
        </Text>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  half: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: '#111',
  },
  light: {
    backgroundColor: '#fff',
  },
  crown: {
    fontSize: 18,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  nameDark: {
    color: 'rgba(255,255,255,0.65)',
  },
  nameLight: {
    color: 'rgba(17,17,17,0.5)',
  },
  score: {
    fontSize: 170,
    fontWeight: '800',
    letterSpacing: -6,
    fontVariant: ['tabular-nums'],
  },
  scoreLandscape: {
    fontSize: 150,
  },
  scoreDark: {
    color: '#fff',
  },
  scoreLight: {
    color: '#111',
  },
  decrementButton: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButtonDark: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  decrementButtonLight: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  decrementLabel: {
    fontSize: 20,
  },
  decrementLabelDark: {
    color: 'rgba(255,255,255,0.7)',
  },
  decrementLabelLight: {
    color: 'rgba(0,0,0,0.6)',
  },
})
