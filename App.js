import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [result, setResult] = useState("Appuyez sur le bouton pour parler");

  const startListening = async () => {
    try {
      const transcript = "Exemple de phrase simulée";
      setResult(`🗣️ "${transcript}"`);

      const response = await fetch("https://valexa-nexus-pi-nicolasguen1.replit.app/api/parler", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript })
      });

      const data = await response.json();
      const valexaResponse = data.reponse || "Pas de réponse";
      setResult(prev => `${prev}\n🤖 ${valexaResponse}`);
      Speech.speak(valexaResponse, { language: 'fr-FR' });
    } catch (error) {
      setResult(`Erreur : ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Valexa Voice App</Text>
      <Button title="Parler à Valexa" onPress={startListening} />
      <Text style={styles.output}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'
  },
  title: {
    fontSize: 24, color: '#00d1b2', marginBottom: 20
  },
  output: {
    marginTop: 30, fontSize: 16, color: '#eee', paddingHorizontal: 20, textAlign: 'center'
  }
});