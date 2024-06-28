import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [workSessions, setWorkSessions] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const loadTasksAndWorkSessions = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedWorkSessions = await AsyncStorage.getItem('workSessions');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
        if (storedWorkSessions) {
          setWorkSessions(JSON.parse(storedWorkSessions));
        }
      } catch (error) {
        console.error('Failed to load tasks and work sessions:', error);
      }
    };

    loadTasksAndWorkSessions();
  }, []);

  useEffect(() => {
    const dates = {};
    tasks.forEach(task => {
      if (task.completed) {
        const date = new Date().toDateString();
        if (!dates[date]) {
          dates[date] = { marked: true, dots: [{ key: 'task', color: 'blue' }] };
        } else {
          dates[date].dots.push({ key: 'task', color: 'blue' });
        }
      }
    });
    workSessions.forEach(session => {
      const date = session.date;
      if (!dates[date]) {
        dates[date] = { marked: true, dots: [{ key: 'work', color: 'red' }] };
      } else {
        dates[date].dots.push({ key: 'work', color: 'red' });
      }
    });
    setMarkedDates(dates);
  }, [tasks, workSessions]);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType={'multi-dot'}
      />
      <View style={styles.listContainer}>
        <Text style={styles.title}>Completed Tasks and Work Sessions</Text>
        <FlatList
          data={[...tasks.filter(task => task.completed), ...workSessions]}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.text || `${item.date}: ${Math.floor(item.duration / 60)} minutes`}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
