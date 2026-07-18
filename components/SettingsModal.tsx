import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

import packageJson from '../package.json'

const LINKEDIN_URL = 'https://www.linkedin.com/in/lugom/'
const INSTAGRAM_URL = 'https://www.instagram.com/luis_the_dev/'
const GITHUB_URL = 'https://github.com/Shadowtampa/RachaoPlacar'
const APP_VERSION = packageJson.version

function LinkedInIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#111">
      <Path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </Svg>
  )
}

function InstagramIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#111">
      <Path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38A5.87 5.87 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.66.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.13-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </Svg>
  )
}

function GitHubIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#111">
      <Path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z" />
    </Svg>
  )
}

type SettingsModalProps = {
  visible: boolean
  targetScore: number
  scoreReleased: boolean
  durationInMinutes: number
  teamAName: string
  teamBName: string
  teamAWonLastRound: boolean
  teamBWonLastRound: boolean
  onSave: (
    targetScore: number,
    scoreReleased: boolean,
    durationInMinutes: number,
    teamAName: string,
    teamBName: string,
  ) => void
  onClose: () => void
}

export function SettingsModal({
  visible,
  targetScore,
  scoreReleased,
  durationInMinutes,
  teamAName,
  teamBName,
  teamAWonLastRound,
  teamBWonLastRound,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [targetScoreInput, setTargetScoreInput] = useState(String(targetScore))
  const [scoreReleasedInput, setScoreReleasedInput] = useState(scoreReleased)
  const [durationInput, setDurationInput] = useState(String(durationInMinutes))
  const [teamANameInput, setTeamANameInput] = useState(teamAName)
  const [teamBNameInput, setTeamBNameInput] = useState(teamBName)

  const handleSave = () => {
    const parsedScore = parseInt(targetScoreInput, 10)
    const parsedDuration = parseInt(durationInput, 10)
    onSave(
      Number.isNaN(parsedScore) || parsedScore <= 0 ? targetScore : parsedScore,
      scoreReleasedInput,
      Number.isNaN(parsedDuration) || parsedDuration <= 0 ? durationInMinutes : parsedDuration,
      teamANameInput.trim() === '' ? teamAName : teamANameInput,
      teamBNameInput.trim() === '' ? teamBName : teamBNameInput,
    )
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayFill}>
            <TouchableWithoutFeedback>
              <View style={styles.sheet}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>Configurações</Text>
                  <Text style={styles.version}>v{APP_VERSION}</Text>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>
                    Nome do Time A{teamAWonLastRound ? ' 👑' : ''}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={teamANameInput}
                    onChangeText={setTeamANameInput}
                    maxLength={20}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>
                    Nome do Time B{teamBWonLastRound ? ' 👑' : ''}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={teamBNameInput}
                    onChangeText={setTeamBNameInput}
                    maxLength={20}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Pontuação objetivo</Text>
                  <TextInput
                    style={styles.input}
                    value={targetScoreInput}
                    onChangeText={setTargetScoreInput}
                    keyboardType="number-pad"
                    maxLength={3}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>

                <View style={styles.lockRow}>
                  <Text style={styles.label}>Liberar pontuação</Text>
                  <Switch
                    value={scoreReleasedInput}
                    onValueChange={setScoreReleasedInput}
                    trackColor={{ false: 'rgba(0,0,0,0.15)', true: '#111' }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Tempo da partida (minutos)</Text>
                  <TextInput
                    style={styles.input}
                    value={durationInput}
                    onChangeText={setDurationInput}
                    keyboardType="number-pad"
                    maxLength={3}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>

                <Pressable style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveLabel}>Salvar</Text>
                </Pressable>

                <View style={styles.socialsSection}>
                  <Text style={styles.label}>Redes sociais</Text>
                  <View style={styles.socialsRow}>
                    <Pressable
                      style={styles.socialButton}
                      onPress={() => Linking.openURL(LINKEDIN_URL)}
                    >
                      <LinkedInIcon />
                    </Pressable>
                    <Pressable
                      style={styles.socialButton}
                      onPress={() => Linking.openURL(INSTAGRAM_URL)}
                    >
                      <InstagramIcon />
                    </Pressable>
                    <Pressable
                      style={styles.socialButton}
                      onPress={() => Linking.openURL(GITHUB_URL)}
                    >
                      <GitHubIcon />
                    </Pressable>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  overlayFill: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
  },
  version: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.4)',
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    color: '#111',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 17,
  },
  lockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#111',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  saveLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialsSection: {
    gap: 8,
    marginTop: 6,
  },
  socialsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
  },
  socialLabel: {
    fontSize: 15,
    color: '#111',
    fontWeight: '600',
  },
})
