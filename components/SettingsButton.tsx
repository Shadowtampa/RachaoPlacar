import { Pressable, StyleSheet, Text } from 'react-native'

type SettingsButtonProps = {
  onPress: () => void
}

export function SettingsButton({ onPress }: SettingsButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>⚙️</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    fontSize: 20,
  },
})
