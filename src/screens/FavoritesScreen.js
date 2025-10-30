// src/screens/FavoritesScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// If using expo: import { LinearGradient } from 'expo-linear-gradient';

const favorites = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    title: 'Casual Street Style',
    subtitle: 'Casual',
    tags: ['Comfortable', 'Trendy'],
    date: '2 days ago',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    title: 'Summer Breeze',
    subtitle: 'Casual',
    tags: ['Light', 'Elegant'],
    date: '5 days ago',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6fa0c2',
    title: 'Business Professional',
    subtitle: 'Formal',
    tags: ['Professional', 'Classic'],
    date: '1 week ago',
  },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 22}}>
        {/* Gradient Card */}
        <LinearGradient
          colors={['#b24592', '#f15f79', '#ff916c']}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 1, y: 0.3 }}
          style={styles.gradientCard}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.collectionTitle}>Your Collection</Text>
              <Text style={styles.collectionSubtitle}>You have 3 favorite outfits saved</Text>
            </View>
            <Ionicons name="heart" size={24} color="#fff" />
          </View>
          <TouchableOpacity style={styles.collectionButton}>
            <Text style={styles.collectionButtonText}>Create Outfit from Favorites</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Favorite Outfits List */}
        {favorites.map((item) => (
          <View key={item.id} style={styles.favCard}>
            <Image source={{ uri: item.image }} style={styles.favImg} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.favTitle}>{item.title}</Text>
              <Text style={styles.favSubtitle}>{item.subtitle}</Text>
              <View style={styles.favTagsRow}>
                {item.tags.map((tag, idx) => (
                  <Text key={idx} style={styles.favTag}>{tag}</Text>
                ))}
              </View>
              <View style={styles.favBottomRow}>
                <Text style={styles.favTime}>{item.date}</Text>
                <View style={styles.favActions}>
                  <TouchableOpacity style={{ marginRight: 15 }}>
                    <Ionicons name="share-outline" size={18} color="#7c3aed" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9fb', paddingTop: 16 },
  headerWrap: { paddingTop: 12, alignItems: 'center', marginBottom: 4 },
  headerText: { fontSize: 19, fontWeight: '600', color: '#222' },

  gradientCard: {
    borderRadius: 19,
    padding: 19,
    margin: 16,
    shadowColor: "#ed64a6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8.84,
    elevation: 5,
    marginBottom: 23,
  },
  collectionTitle: { color: '#fff', fontSize: 19, fontWeight: 'bold', marginBottom: 2 },
  collectionSubtitle: { color: '#fdf6f6', fontSize: 14, marginBottom: 18 },
  collectionButton: { backgroundColor: '#fff', borderRadius: 13, alignSelf: 'flex-start' },
  collectionButtonText: { color: '#a21caf', fontWeight: '600', fontSize: 16, paddingVertical: 9, paddingHorizontal: 25 },

  favCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 17,
    marginHorizontal: 16,
    marginBottom: 19,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4.65,
    elevation: 3,
    padding: 10,
  },
  favImg: { width: 77, height: 77, borderRadius: 13, backgroundColor: "#eee" },
  favTitle: { fontWeight: '700', fontSize: 16, marginBottom: 1, color: "#231942" },
  favSubtitle: { fontSize: 14, marginBottom: 5, color: "#7c3aed" },
  favTagsRow: { flexDirection: 'row', marginBottom: 7 },
  favTag: { backgroundColor: '#f3e8ff', color: '#a21caf', borderRadius: 7, fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6, marginTop: 3 },
  favBottomRow: { flexDirection: 'row', alignItems: 'center', marginTop: 1, justifyContent: 'space-between' },
  favTime: { color: '#7b7b8d', fontSize: 13 },
  favActions: { flexDirection: 'row', alignItems: 'center' },
});
