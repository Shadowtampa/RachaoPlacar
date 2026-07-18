import { Pressable, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type ResetButtonProps = {
  onPress: () => void
}

export function ResetButton({ onPress }: ResetButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Svg width={21} height={21} viewBox="0 0 24 24" fill="none">
        <Path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="#111" strokeWidth={2.2} strokeLinecap="round" />
        <Path
          d="M18.2 2.6v4.6h-4.6"
          stroke="#111"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
