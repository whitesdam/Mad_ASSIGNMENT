import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const OUTFIT_OPTIONS = [
  {
    id: 1,
    image: require('../../assets/logo.jpeg'), // update with your outfit images
    match: 94,
    style: 'Smart Casual Look',
    tags: ['casual', 'mild'],
  },
  {
    id: 2,
    image: require('../../assets/logo.jpeg'),
    match: 88,
    style: 'Summer Dress Up',
    tags: ['formal', 'warm'],
  },
];

export default function OutfitGeneratorScreen({ navigation }) {
  const [occasion, setOccasion] = useState('Casual Outing');
  const [weather, setWeather] = useState('Mild (15-25°C)');
  const [formality, setFormality] = useState(50);

  return (
    <View style={styles.baseContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Outfit Generator</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Preferences Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Outfit Preferences</Text>
          <Text style={styles.label}>Occasion</Text>
          <View style={styles.inputBox}>
            <Picker
              selectedValue={occasion}
              onValueChange={(v) => setOccasion(v)}
              style={styles.picker}
              dropdownIconColor="#a4508b"
            >
              <Picker.Item label="Casual Outing" value="Casual Outing" />
              <Picker.Item label="Business Meeting" value="Business Meeting" />
              <Picker.Item label="Party" value="Party" />
            </Picker>
          </View>

          <Text style={styles.label}>Weather</Text>
          <View style={styles.inputBox}>
            <Picker
              selectedValue={weather}
              onValueChange={(v) => setWeather(v)}
              style={styles.picker}
              dropdownIconColor="#a4508b"
            >
              <Picker.Item label="Mild (15-25°C)" value="Mild (15-25°C)" />
              <Picker.Item label="Hot (>25°C)" value="Hot (>25°C)" />
              <Picker.Item label="Cool (<15°C)" value="Cool (<15°C)" />
            </Picker>
          </View>

          <Text style={styles.label}>Formality Level: {formality}%</Text>
          <View style={styles.sliderRow}>
            <Text style={{ color: '#333' }}>Casual</Text>
            <Slider
              style={{ flex: 1, marginHorizontal: 8 }}
              minimumValue={0}
              maximumValue={100}
              value={formality}
              onValueChange={setFormality}
              minimumTrackTintColor="#1a0748"
              maximumTrackTintColor="#e2e2e2"
              thumbTintColor="#a4508b"
            />
            <Text style={{ color: '#333' }}>Formal</Text>
          </View>
        </View>

        {/* Gradient Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonOuter}
          onPress={() => navigation.navigate('OutfitDetails')}
        >
          <LinearGradient
            colors={['#a4508b', '#f86647']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Generate Outfit</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Outfits List */}
        <Text style={styles.generatedTitle}>Generated Outfits</Text>
        {OUTFIT_OPTIONS.map((o) => (
          <View style={styles.outfitCard} key={o.id}>
            <Image style={styles.outfitImage} source={o.image} />
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{o.match}% Match</Text>
            </View>
            <Text style={styles.outfitStyle}>{o.style}</Text>
            <View style={styles.tagRow}>
              {o.tags.map((tag) => (
                <View style={styles.tag} key={tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: '#fafbfc',
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202222',
  },
  headerIcon: {
    fontSize: 24,
    color: '#938ece',
  },
  card: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    color: '#38304d',
    fontWeight: '600',
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: '#353c50',
    marginBottom: 5,
    marginTop: 14,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: "#f1f1f7",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 44,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonOuter: {
    marginHorizontal: 18,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  generatedTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2c2e33',
    marginHorizontal: 24,
    marginVertical: 10,
  },
  outfitCard: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 19,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    paddingBottom: 16,
    position: "relative",
  },
  outfitImage: {
    width: "100%",
    height: 170,
    borderTopRightRadius: 19,
    borderTopLeftRadius: 19,
    marginBottom: 8,
  },
  matchBadge: {
    position: "absolute",
    right: 18,
    top: 16,
    backgroundColor: "#faf7f7cc",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ede5ef",
  },
  matchText: {
    color: "#a4508b",
    fontWeight: "bold",
    fontSize: 15,
  },
  outfitStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#23222d",
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 7,
  },
  tagRow: {
    flexDirection: "row",
    marginLeft: 14,
  },
  tag: {
    backgroundColor: "#f4edfa",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
    marginTop: 4,
  },
  tagText: {
    color: "#a4508b",
    fontWeight: "500",
    fontSize: 13,
    textTransform: "capitalize",
  },
});
