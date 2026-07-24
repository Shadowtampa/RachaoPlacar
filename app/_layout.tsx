import { Analytics } from '@vercel/analytics/react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Analytics />
    </>
  )
}
