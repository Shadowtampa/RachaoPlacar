import { Pressable, StyleSheet, Text } from 'react-native'

type PlayPauseButtonProps = {
  running: boolean
  onPress: () => void
  disabled?: boolean
}

export function PlayPauseButton({ running, onPress, disabled }: PlayPauseButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{running ? 'Pause' : 'Play'}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
})
