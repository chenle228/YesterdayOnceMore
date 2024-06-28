import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import JournalEntryDetail from './components/JournalEntryDetail';
import NewJournalEntry from './components/NewJournalEntry';
import CalendarPage from './components/CalendarPage';
import ToDoListPage from './components/ToDoListPage';
import PomodoroTimerPage from './components/PomodoroTimerPage';
import SettingsPage from './components/SettingsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome to Yesterday Once More" component={Auth} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="JournalEntryDetail" component={JournalEntryDetail} />
        <Stack.Screen name="NewJournalEntry" component={NewJournalEntry} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="ToDoList" component={ToDoListPage} />
        <Stack.Screen name="PomodoroTimer" component={PomodoroTimerPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
