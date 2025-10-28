import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import UserContext from '../../UserContext';
function WelcomeScreen({ route, navigation }) {
  const { nickname } = useContext(UserContext);

  // Dummy SVG icons, use your own assets or react-native-vector-icons 
  // Replace with your SVG or PNG images for men/women!
  const menIcon = require('../../assets/men.png'); // Place in assets folder
  const womenIcon = require('../../assets/women.png'); // Place in assets folder

  const handleSelect = (gender) => {
    // Pass gender and nickname if needed
   navigation.replace('MainTabs', { gender, nickname });

  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Let's personalize{'\n'}your style!</Text>
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleSelect('Men')}>
          <Image source={menIcon} style={styles.iconImg} />
          <Text style={styles.optionLabel}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleSelect('Women')}>
          <Image source={womenIcon} style={styles.iconImg} />
          <Text style={styles.optionLabel}>Women</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },
  welcomeBox: {
    backgroundColor: '#f4edfa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 36,
    alignItems: 'center',
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 22,
    color: '#353c50',
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  optionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f6fa',
    borderRadius: 17,
    marginHorizontal: 10,
    paddingVertical: 24,
    shadowColor: "#c6b5ef",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  iconImg: {
    width: 54,
    height: 54,
    marginBottom: 10,
    resizeMode: "contain",
  },
  optionLabel: {
    fontSize: 17,
    color: '#202222',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default WelcomeScreen;
