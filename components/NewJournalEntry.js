import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export default function NewJournalEntry({ route, navigation }) {
  const { date, onAddEntry } = route.params
  const [text, setText] = useState('')

  const handleSave = () => {
    onAddEntry({
      text,
      year: new Date().getFullYear(),
    })
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`Date: ${date}`}</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Write your journal entry here..."
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
})

