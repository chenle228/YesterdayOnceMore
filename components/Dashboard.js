import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Dashboard({ navigation }) {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });

  const [journalEntries, setJournalEntries] = useState([
    {
      text: "Today I learned about React Native components. It's fascinating how flexible they are.",
      year: 2020,
    },
    {
      text: "Worked on a new project at work. It's a challenging yet rewarding experience.",
      year: 2021,
    },
    {
      text: "Spent the day reading a great book on JavaScript best practices.",
      year: 2022,
    },
    {
      text: "Enjoyed a beautiful walk in the park. The weather was perfect.",
      year: 2023,
    },
  ]);

  const getPreviewText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleSave = (date, newText) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) =>
        `${day} ${month} ${entry.year}` === date
          ? { ...entry, text: newText }
          : entry
      )
    );
  };

  const handleDelete = (date) => {
    setJournalEntries((prevEntries) =>
      prevEntries.filter((entry) => `${day} ${month} ${entry.year}` !== date)
    );
  };

  const handleAddEntry = (newEntry) => {
    setJournalEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {journalEntries.map((entry, index) => (
          <TouchableOpacity
            key={index}
            style={styles.entryBox}
            onPress={() =>
              navigation.navigate('JournalEntryDetail', {
                entry: { text: entry.text, date: `${day} ${month} ${entry.year}` },
                onSave: handleSave,
                onDelete: handleDelete,
              })
            }
          >
            <Text style={styles.entryText}>{getPreviewText(entry.text, 20)}</Text>
            <Text style={styles.entryDate}>Date: {day} {month} {entry.year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Ionicons name="calendar-outline" size={30} color="black" />
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ToDoList')}
        >
          <Ionicons name="list-outline" size={30} color="black" />
          <Text style={styles.buttonText}>To Do List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('NewJournalEntry', {
              date: `${day} ${month} ${today.getFullYear()}`,
              onAddEntry: handleAddEntry,
            })
          }
        >
          <Ionicons name="add-circle-outline" size={30} color="black" />
          <Text style={styles.buttonText}>New Journal Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PomodoroTimer')}
        >
          <Ionicons name="timer-outline" size={30} color="black" />
          <Text style={styles.buttonText}>Pomodoro Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="person-outline" size={30} color="black" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  entryBox: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  entryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust spacing as needed
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
});
