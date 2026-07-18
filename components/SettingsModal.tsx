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
                <Text style={styles.title}>Configurações</Text>

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
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
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
})
