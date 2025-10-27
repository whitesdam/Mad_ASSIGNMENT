import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function WelcomeScreen({ route, navigation }) {
  const { nickname } = route.params;
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  Animated.timing(animValue, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: false,
  }).start(() => {
    navigation.replace('OutfitGenerator'); // <-- Add here
  });
}, []);


  const left = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width / 2 - 100, 20],
  });

  const top = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2 - 20, 40],
  });

  const fontSize = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [32, 16],
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.welcomeText,
          { position: 'absolute', left, top, fontSize },
        ]}
      >
        Welcome {nickname}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
