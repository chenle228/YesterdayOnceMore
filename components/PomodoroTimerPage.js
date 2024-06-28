import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PomodoroTimerPage() {
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [modalVisible, setModalVisible] = useState(false);
  const [workSessions, setWorkSessions] = useState([]);

  useEffect(() => {
    const loadWorkSessions = async () => {
      try {
        const storedWorkSessions = await AsyncStorage.getItem('workSessions');
        if (storedWorkSessions) {
          setWorkSessions(JSON.parse(storedWorkSessions));
        }
      } catch (error) {
        console.error('Failed to load work sessions:', error);
      }
    };

    loadWorkSessions();
  }, []);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (isWorking) {
              const newWorkSession = { date: new Date().toDateString(), duration: workTime };
              const updatedWorkSessions = [...workSessions, newWorkSession];
              setWorkSessions(updatedWorkSessions);
              saveWorkSessions(updatedWorkSessions);
            }
            setIsWorking(!isWorking);
            return isWorking ? breakTime : workTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, isWorking, breakTime, workTime, workSessions]);

  const saveWorkSessions = async (workSessionsToSave) => {
    try {
      await AsyncStorage.setItem('workSessions', JSON.stringify(workSessionsToSave));
    } catch (error) {
      console.error('Failed to save work sessions:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(isWorking ? workTime : breakTime);
  };

  const handleSwitchMode = () => {
    setIsRunning(false);
    setIsWorking(!isWorking);
    setTime(isWorking ? breakTime : workTime);
  };

  const handleSaveSettings = () => {
    setTime(isWorking ? workTime : breakTime);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isWorking ? 'Work Time' : 'Break Time'}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <TouchableOpacity onPress={handleStartPause} style={styles.button}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSwitchMode} style={styles.button}>
        <Text style={styles.buttonText}>Switch Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Settings</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Work Time (minutes)"
            onChangeText={(text) => setWorkTime(Number(text) * 60)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Break Time (minutes)"
            onChangeText={(text) => setBreakTime(Number(text) * 60)}
          />
          <Button title="Save" onPress={handleSaveSettings} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Text style={styles.historyTitle}>Work Sessions</Text>
      <FlatList
        data={workSessions}
        renderItem={({ item }) => (
          <Text>{`${item.date}: ${Math.floor(item.duration / 60)} minutes`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
