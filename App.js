import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [lower, setLower] = useState('');
  const [upper, setUpper] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [language, setLanguage] = useState(null);

  const translations = {
    en: {
      title: 'Generate between two numbers',
      lowerPlaceholder: 'lower',
      upperPlaceholder: 'higher',
      generate: 'Generate Number',
      clear: 'Clear',
      invalid: 'Invalid Input'
    },
    bs: {
      title: 'Generiši između dva broja',
      lowerPlaceholder: 'veci',
      upperPlaceholder: 'manji',
      generate: 'Generiši broj',
      clear: 'Obriši',
      invalid: 'Nevažeći unos'
    }
  };

  const generateRandomNumber = () => {
    const lowerNum = parseInt(lower);
    const upperNum = parseInt(upper);
    if (isNaN(lowerNum) || isNaN(upperNum) || lowerNum >= upperNum) {
      setRandomNumber(translations[language].invalid);
      return;
    }
    const number = Math.floor(Math.random() * (upperNum - lowerNum + 1)) + lowerNum;
    setRandomNumber(number);
  };

  const clearInputs = () => {
    setLower('');
    setUpper('');
    setRandomNumber(null);
  };

  if (!language) {
    return (
      <View style={styles.container}>
        <Text style={styles.languageTitle}>Choose Language / Odaberite Jezik</Text>
        <View style={styles.languageButtonContainer}>
          <Button title="English" onPress={() => setLanguage('en')} color="#6200ea" />
          <Button title="Bosanski" onPress={() => setLanguage('bs')} color="#d32f2f" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations[language].title}</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder={translations[language].lowerPlaceholder} 
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={lower}
          onChangeText={setLower}
          style={styles.input}
        />
        <TextInput 
          placeholder={translations[language].upperPlaceholder} 
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={upper}
          onChangeText={setUpper}
          style={styles.input}
        />
      </View>
      {randomNumber !== null && <Text style={styles.result}>{randomNumber}</Text>}
      <View style={styles.generateButtonContainer}>
        <Button title={translations[language].generate} onPress={generateRandomNumber} color="#6200ea" />
      </View>
      <View style={styles.clearButtonContainer}>
        <Button title={translations[language].clear} onPress={clearInputs} color="#d32f2f" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  languageTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  languageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    width: 100,
    textAlign: 'center',
    marginRight: 10,
    color: '#fff',
    paddingBottom: 5,
  },
  generateButtonContainer: {
    marginTop: 20,
  },
  clearButtonContainer: {
    marginTop: 10,
  },
  result: {
    fontSize: 32,
    color: '#fff',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6200ea',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    width: 150,
    fontWeight: 'bold',
  },
});

export default App;
