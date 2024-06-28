import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function signIn() {
    setLoading(true);
    // Simulating authentication process
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard');
    }, 1000);
  }

  function signUp() {
    setLoading(true);
    // Simulating sign-up process
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard');
    }, 1000);
  }

  function continueAsGuest() {
    navigation.navigate('Dashboard');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>already have an account?</Text>
        <Button title="Log in" disabled={loading} onPress={signIn} />
      </View>
      <View style={styles.verticallySpaced}>
        <Text>first time here?</Text>
        <Button title="Create an account" disabled={loading} onPress={signUp} />
      </View>
      <View style={styles.verticallySpaced}>
        <Text>or</Text>
        <Button title="Continue as Guest" onPress={continueAsGuest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

