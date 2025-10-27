import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function NicknameScreen({ navigation }) {
  const [nickname, setNickname] = useState('');

  const onSubmit = () => {
    if (nickname.trim().length > 0) {
      navigation.navigate('WelcomeScreen', { nickname });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What should we call you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter nickname"
        value={nickname}
        onChangeText={setNickname}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
    color: '#a4508b',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#a4508b',
    borderWidth: 1.5,
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#a4508b',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NicknameScreen;
