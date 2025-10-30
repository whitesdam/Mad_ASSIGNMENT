// src/screens/HomeScreen.js

import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { nickname } = useContext(UserContext);

  const suggestions = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      match: '95% Match',
      title: 'Casual Street Style',
      subtitle: 'Casual',
      tags: ['Comfortable', 'Trendy', 'Everyday'],
      likes: 234,
      favorite: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1469398715555-76331a6fa0c2',
      match: '88% Match',
      title: 'Formal Business Look',
      subtitle: 'Formal',
      tags: ['Elegant', 'Chic', 'Meeting'],
      likes: 145,
      favorite: true,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
      match: '92% Match',
      title: 'Sporty Vibes',
      subtitle: 'Athleisure',
      tags: ['Sporty', 'Active', 'Comfort'],
      likes: 175,
      favorite: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.helloText}>Hello, {nickname ? nickname : 'User'}</Text>
          <Text style={styles.styleQuestion}>What's your style today?</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={26} color="#c026d3" />
        </TouchableOpacity>
      </View>

      {/* Only Two Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>Generate Outfit</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.actionBtn}
  onPress={() => navigation.navigate('Wardrobe')}
>
  <Text style={styles.actionText}>My Wardrobe</Text>
</TouchableOpacity>

      </View>

      {/* Today's Suggestions */}
      <Text style={styles.suggestionsTitle}>Today's Suggestions</Text>
      <ScrollView style={styles.suggestionsList}>
        {suggestions.map((item) => (
          <View style={styles.card} key={item.id}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <Text style={styles.matchBadge}>{item.match}</Text>
                <TouchableOpacity style={styles.cardHeart}>
                  <Ionicons
                    name={item.favorite ? 'heart' : 'heart-outline'}
                    size={22}
                    color="#c026d3"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              <View style={styles.tagsRow}>
                {item.tags.map((tag, idx) => (
                  <Text style={styles.tag} key={idx}>{tag}</Text>
                ))}
              </View>
              <View style={styles.likeRow}>
                <Ionicons name="heart-outline" size={18} color="#aaa" />
                <Text style={styles.likeCount}>{item.likes}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, alignItems: 'center' },
  helloText: { fontSize: 22, fontWeight: 'bold' },
  styleQuestion: { fontSize: 15, color: '#888' },
  iconButton: { padding: 8 },
  actionButtons: { flexDirection: 'row', marginVertical: 18, marginHorizontal: 12, justifyContent: 'flex-start' },
  generateBtn: { backgroundColor: '#c026d3', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 11, marginRight: 14 },
  generateText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  actionBtn: { backgroundColor: '#f3e8ff', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 11 },
  actionText: { color: '#111', fontWeight: '600', fontSize: 15 },
  suggestionsTitle: { fontSize: 17, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  suggestionsList: { flex: 1 },
  card: { backgroundColor: '#faf5ff', borderRadius: 14, margin: 14, overflow: 'hidden', elevation: 3 },
  imageWrapper: { position: 'relative' },
  cardImage: { height: 210, width: '100%', resizeMode: 'cover' },
  cardOverlay: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', zIndex: 1 },
  matchBadge: { backgroundColor: '#fff', color: '#c026d3', fontWeight: 'bold', fontSize: 16, borderRadius: 15, paddingVertical: 5, paddingHorizontal: 13, marginRight: 8, elevation: 1 },
  cardHeart: { marginLeft: 5, padding: 3 },
  cardContent: { padding: 14 },
  cardTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 1 },
  cardSubtitle: { color: '#7c3aed', marginBottom: 6 },
  tagsRow: { flexDirection: 'row', marginVertical: 2 },
  tag: { backgroundColor: '#f3e8ff', borderRadius: 7, marginRight: 6, fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, color: '#a21caf' },
  likeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  likeCount: { fontSize: 14, color: '#aaa', marginLeft: 5 },
});
