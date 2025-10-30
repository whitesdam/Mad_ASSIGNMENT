import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const wardrobeData = [
  { id: '1', image: 'https://images.unsplash.com/photo-1469398715555-76331a6fa0c2', title: 'White T-Shirt', subtitle: 'Casual', color: 'White', colorDot: '#fff', type: 'Tops' },
  { id: '2', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', title: 'Black Turtleneck', subtitle: 'Smart Casual', color: 'Black', colorDot: '#000', type: 'Tops' },
  { id: '3', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', title: 'Striped Shirt', subtitle: 'Casual', color: 'Multi', colorDot: '#888', type: 'Tops' },
  { id: '4', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', title: 'Blue Blouse', subtitle: 'Formal', color: 'Blue', colorDot: '#1d4ed8', type: 'Tops' },
  // Add more if needed, include Bottoms, Shoes, Accessories types for tabs
];

const tabs = ['Tops', 'Bottoms', 'Shoes', 'Accessories'];

export default function WardrobeScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Tops');
  const [search, setSearch] = useState('');

  // Wardrobe stats (dummy data)
  const totalItems = 48;
  const mostWorn = 'White T-Shirt';
  const newest = 'Blue Blouse';
  const categories = 12;

  return (
    <View style={{ flex: 1, backgroundColor: '#fafbfb', paddingTop: 37 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:4}}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wardrobe</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={23} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#bbb" style={{marginLeft: 7, marginRight: 4}} />
        <TextInput
          placeholder="Search your wardrobe..."
          style={{flex: 1, paddingVertical: 8, fontSize: 15}}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add New Item (Gradient) */}
      <TouchableOpacity activeOpacity={0.75} style={{ marginHorizontal: 19, marginTop: 9, marginBottom: 7 }}>
        <LinearGradient
          colors={['#a445b2', '#f15f79']}
          start={{ x: 0.0, y: 0.67 }}
          end={{ x: 1, y: 0 }}
          style={styles.addBtnGradient}
        >
          <Ionicons name="add" size={21} color="#fff" />
          <Text style={styles.addBtnText}>Add New Item</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, selectedTab === tab && styles.activeTabBtn]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabBtnText,
              selectedTab === tab && styles.tabBtnTextActive
            ]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Wardrobe grid */}
      <FlatList
        data={wardrobeData.filter(i => i.type === selectedTab && i.title.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:2}}>
              <View style={[styles.colorDot,{backgroundColor:item.colorDot}]} />
              <Text style={styles.colorText}>{item.color}</Text>
            </View>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={{paddingBottom:9}}
        style={{minHeight:210,marginBottom:13}}
        columnWrapperStyle={{justifyContent:'space-between',paddingHorizontal:15}}
        showsVerticalScrollIndicator={false}
      />

      {/* Wardrobe Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsHeader}>Wardrobe Stats</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statsItem, {backgroundColor:'#f7eafc'}]}>
            <Text style={styles.statsLabel}>Total Items</Text>
            <Text style={styles.statsValuePurple}>{totalItems}</Text>
          </View>
          <View style={[styles.statsItem, {backgroundColor:'#fee7ee'}]}>
            <Text style={[styles.statsLabel, {color:'#e11d48'}]}>Most Worn</Text>
            <Text style={styles.statsValueRed}>{mostWorn}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statsItem, {backgroundColor:'#fff4eb'}]}>
            <Text style={[styles.statsLabel, {color:'#fb923c'}]}>Newest</Text>
            <Text style={styles.statsValueOrange}>{newest}</Text>
          </View>
          <View style={[styles.statsItem, {backgroundColor:'#e0ecff'}]}>
            <Text style={[styles.statsLabel, {color:'#2563eb'}]}>Categories</Text>
            <Text style={styles.statsValueBlue}>{categories}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, marginBottom:13 },
  headerTitle: { fontSize:19, fontWeight:'600', color:'#222' },
  searchBar: {
    flexDirection:'row', alignItems:'center', backgroundColor:'#f3f3f7',
    borderRadius:12, marginHorizontal:17, marginBottom:6, paddingHorizontal:7
  },
  addBtnGradient: {
    flexDirection:'row', alignItems:'center', borderRadius:13,
    paddingVertical:11, justifyContent:'center'
  },
  addBtnText: {color:'#fff', marginLeft:8, fontWeight:'bold', fontSize:16},
  tabRow: { flexDirection:'row', justifyContent:'space-between', marginTop:10, marginHorizontal:12, marginBottom:7},
  tabBtn: {
    paddingVertical:7, paddingHorizontal:18, borderRadius:9, backgroundColor:'#f5f5f7', marginRight:6
  },
  activeTabBtn: { backgroundColor:'#fff' },
  tabBtnText: { fontWeight:'600', color:'#888', fontSize:15 },
  tabBtnTextActive: { color:'#222' },
  card: {
    backgroundColor:"#fff", borderRadius:15, alignItems:'flex-start', width:'48%', marginBottom:14, padding:10
  },
  cardImage: {
    width:'100%',height:75, borderRadius:11, marginBottom:6, backgroundColor:'#ddd'
  },
  cardTitle: { fontWeight:'bold', fontSize:15, marginBottom:1, color:'#222' },
  cardSubtitle: { color:'#818cf8', fontSize:13, marginBottom:1 },
  colorDot: { width:13, height:13, borderRadius:7, marginRight:6, borderWidth:1, borderColor:'#d1d5db'},
  colorText: { fontSize:13, color:'#484b57' },
  statsCard: {
    backgroundColor:'#fff', borderRadius:19,marginHorizontal:16,padding:14,marginBottom:17,marginTop:2,
    shadowColor: "#c084fc",shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.06,shadowRadius: 4,elevation: 3
  },
  statsHeader: { fontWeight:'700', fontSize:17, marginBottom:7, color:'#161828' },
  statsRow: { flexDirection:'row', justifyContent:'space-between', marginTop:5 },
  statsItem: { width:'48%',padding:12, borderRadius:13, marginVertical:6 },
  statsLabel: { fontSize:14, color:'#a21caf', marginBottom:3 },
  statsValuePurple: { fontWeight:'bold', color:'#a21caf', fontSize:17 },
  statsValueRed: { fontWeight:'bold', color:'#e11d48', fontSize:17 },
  statsValueOrange: { fontWeight:'bold', color:'#fb923c', fontSize:17 },
  statsValueBlue: { fontWeight:'bold', color:'#2563eb', fontSize:17 },
});
