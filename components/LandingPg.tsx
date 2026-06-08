import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          MoodScroll
        </Text>

        <Text style={styles.subtitle}>
          Daily inspiration, wisdom, and motivation.
        </Text>

        <Text style={styles.author}>
          — QuoteVerse
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 200,
    height: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 20,
  },

  author: {
    fontSize: 15,
    color: '#888',
  },
})