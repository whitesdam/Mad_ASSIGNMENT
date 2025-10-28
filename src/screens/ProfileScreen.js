import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../UserContext'; // or adjust the path as needed

export default function ProfileScreen({ props}) {
    const { nickname, email } = useContext(UserContext);
  const navigation = useNavigation();
 

  const [profileImage, setProfileImage] = useState('https://your-image-url.com/photo.jpg');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled && result.uri) {
      setProfileImage(result.uri);
    }
  };

  const handleSignOut = () => {
    // Here you should clear user state/storage
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Contact us at: support@example.com');
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#A4508B', '#F9D423']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Ionicons name="arrow-back" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Profile</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" style={styles.headerIcon} />
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper} activeOpacity={0.8}>
          <Image
            style={styles.avatar}
            source={{ uri: profileImage }}
          />
          <View style={styles.uploadIcon}>
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{nickname}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>48</Text>
            <Text style={styles.statsLabel}>Items</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>156</Text>
            <Text style={styles.statsLabel}>Outfits</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>24</Text>
            <Text style={styles.statsLabel}>Favorites</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <FontAwesome5 name="heart" size={20} color="#C2185B" />
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>Favorites</Text>
            <Text style={styles.rowSubtitle}>24 items</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialIcons name="style" size={20} color="#7E57C2" />
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>Style Preferences</Text>
            <Text style={styles.rowSubtitle}>Casual, Minimal</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="notifications" size={20} color="#FF7043" />
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Text style={styles.rowSubtitle}>Enabled</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Preferences</Text>
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Favorite Colors</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.colorCircle, { backgroundColor: '#111' }]} />
            <View style={[styles.colorCircle, { backgroundColor: '#4682B4' }]} />
            <View style={[styles.colorCircle, { backgroundColor: '#FF69B4' }]} />
          </View>
        </View>
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Size</Text>
          <Text style={styles.prefValue}>M</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.helpRow} onPress={handleHelpSupport}>
          <Ionicons name="help-circle-outline" size={22} color="#333" />
          <Text style={styles.rowTitle}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutRow} onPress={handleSignOut}>
          <Ionicons name="exit-outline" size={22} color="#d32f2f" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

// ... styles remain same as before ...


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafd' },
  header: { paddingVertical: 28, paddingHorizontal: 18, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, alignItems: 'center', marginBottom: 10 },
  headerTop: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerIcon: { padding: 4 },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', flex: 1, textAlign: 'center' },
  avatarWrapper: { alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#fff' },
  uploadIcon: { position: 'absolute', bottom: 4, right: 4, backgroundColor: '#A4508B', padding: 3, borderRadius: 10 },
  name: { fontSize: 21, fontWeight: 'bold', color: '#fff', marginTop: 8, textAlign: 'center' },
  email: { fontSize: 15, color: '#fff', textAlign: 'center', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 2 },
  statsItem: { alignItems: 'center', flex: 1 },
  statsValue: { fontSize: 17, color: '#fff', fontWeight: 'bold' },
  statsLabel: { color: '#fff', fontSize: 13, marginTop: 3 },
  section: { backgroundColor: '#fff', borderRadius: 18, margin: 18, padding: 12, shadowColor: '#888', shadowOpacity: 0.16, shadowRadius: 8, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11 },
  rowLabel: { marginLeft: 12 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#2A2A2A' },
  rowSubtitle: { fontSize: 12, color: '#888' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  prefRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 7 },
  prefLabel: { fontSize: 15, color: '#444' },
  prefValue: { fontSize: 15, color: '#666' },
  colorCircle: { width: 22, height: 22, borderRadius: 11, marginHorizontal: 3, borderWidth: 2, borderColor: '#eee' },
  helpRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 4 },
  signOutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 1, borderColor: '#f4cccc', marginTop: 6 },
  signOutText: { color: '#d32f2f', fontWeight: 'bold', marginLeft: 6, fontSize: 16 },
  versionText: { textAlign: 'center', color: '#888', marginTop: 7, fontSize: 13 },
});
