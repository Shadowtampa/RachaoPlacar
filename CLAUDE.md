# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Expo TypeScript scaffold in place (`create-expo-app` blank-typescript) with Expo Router. NativeWind was tried and abandoned — its Babel plugin (`react-native-css-interop`) hard-requires `react-native-worklets/plugin`, and Metro's transform worker couldn't resolve it even with the package installed. Styling uses plain React Native `StyleSheet.create` instead.

## Source of truth

Full product spec lives in [AGENTS.md](AGENTS.md) — read it before doing any work here. It covers:

- Stack: React Native + Expo + TypeScript + Expo Router + React Native `StyleSheet`
- MVP scope (scoreboard, timer, settings screen) and state shape (`teamA`, `teamB`, `game`)
- Business rules (score/timer behavior, win condition)
- Philosophy/conventions (mobile-first, offline-first, small components, functional components + hooks only, no Context/state libs unless needed, no classes)
- Planned component breakdown (`ScoreCard`, `ScoreButton`, `Timer`, `PlayPauseButton`, `SettingsButton`, `SettingsModal`)
- Explicitly out-of-scope for MVP (listed under "Evolução futura")
- Note at the top of AGENTS.md: Expo APIs may have changed since training — check versioned docs at https://docs.expo.dev/versions/v57.0.0/ before relying on Expo API behavior from memory.

When AGENTS.md and this file conflict, AGENTS.md wins — update this file instead of contradicting it.

## Commands

- `npx expo start` — run the dev server
- `npx tsc --noEmit` — typecheck
