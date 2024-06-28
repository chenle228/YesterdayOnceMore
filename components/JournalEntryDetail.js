import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'

export default function JournalEntryDetail({ route, navigation }) {
  const { entry, onSave, onDelete } = route.params
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(entry.text)

  const handleSave = () => {
    onSave(entry.date, editedText)
    setIsEditing(false)
    navigation.goBack()
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete(entry.date)
            navigation.goBack()
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`Date: ${entry.date}`}</Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={editedText}
          onChangeText={setEditedText}
          multiline
        />
      ) : (
        <Text style={styles.text}>{entry.text}</Text>
      )}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Save" onPress={handleSave} />
        ) : (
          <Button title="Edit" onPress={() => setIsEditing(true)} />
        )}
        <Button title="Delete" color="red" onPress={handleDelete} />
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
  text: {
    fontSize: 16,
  },
  textInput: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
