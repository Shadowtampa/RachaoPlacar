import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
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

type SettingsModalProps = {
  visible: boolean
  targetScore: number
  scoreLocked: boolean
  durationInMinutes: number
  teamAName: string
  teamBName: string
  teamAWonLastRound: boolean
  teamBWonLastRound: boolean
  onSave: (
    targetScore: number,
    scoreLocked: boolean,
    durationInMinutes: number,
    teamAName: string,
    teamBName: string,
  ) => void
  onClose: () => void
}

export function SettingsModal({
  visible,
  targetScore,
  scoreLocked,
  durationInMinutes,
  teamAName,
  teamBName,
  teamAWonLastRound,
  teamBWonLastRound,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [targetScoreInput, setTargetScoreInput] = useState(String(targetScore))
  const [scoreLockedInput, setScoreLockedInput] = useState(scoreLocked)
  const [durationInput, setDurationInput] = useState(String(durationInMinutes))
  const [teamANameInput, setTeamANameInput] = useState(teamAName)
  const [teamBNameInput, setTeamBNameInput] = useState(teamBName)

  const handleSave = () => {
    const parsedScore = parseInt(targetScoreInput, 10)
    const parsedDuration = parseInt(durationInput, 10)
    onSave(
      Number.isNaN(parsedScore) || parsedScore <= 0 ? targetScore : parsedScore,
      scoreLockedInput,
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
                <Text style={styles.title}>Configurações</Text>

                <View style={styles.section}>
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

                <View style={styles.section}>
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

                  <View style={styles.lockRow}>
                    <Text style={styles.label}>Bloquear pontuação</Text>
                    <Switch value={scoreLockedInput} onValueChange={setScoreLockedInput} />
                  </View>
                </View>

                <View style={styles.section}>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  section: {
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  lockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
