import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { AppState } from '../types'

export function useCountdown(
  running: boolean,
  setState: Dispatch<SetStateAction<AppState>>,
) {
  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.game.remainingTime <= 1) {
          return { ...prev, game: { ...prev.game, remainingTime: 0, running: false } }
        }
        return { ...prev, game: { ...prev.game, remainingTime: prev.game.remainingTime - 1 } }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running, setState])
}
