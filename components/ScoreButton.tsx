import { Pressable, StyleSheet, Text } from 'react-native'

type ScoreButtonProps = {
  label: string
  onPress: () => void
}

export function ScoreButton({ label, onPress }: ScoreButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
  },
})
