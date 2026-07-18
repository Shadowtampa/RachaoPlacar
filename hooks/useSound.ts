import { useEffect, useRef } from 'react'
import { useAudioPlayer } from 'expo-audio'

const WHISTLE_SOUND = require('../assets/sounds/apitoArbitro.mp3')

export function useSound() {
  const player = useAudioPlayer(WHISTLE_SOUND)
  const remainingRef = useRef(0)

  useEffect(() => {
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (!status.didJustFinish) return
      remainingRef.current -= 1
      if (remainingRef.current > 0) {
        player.seekTo(0)
        player.play()
      }
    })
    return () => subscription.remove()
  }, [player])

  return (times = 1) => {
    remainingRef.current = times
    player.seekTo(0)
    player.play()
  }
}
