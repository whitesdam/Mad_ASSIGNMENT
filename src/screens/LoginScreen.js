import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

 useEffect(() => {
  if (response?.type === 'success') {
    const { authentication } = response;
    setLoading(true);
    fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${authentication.accessToken}` },
    })
    .then(res => res.json())
    .then(user => {
      fetch('https://your-backend.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name: user.name, googleId: user.id }),
      })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        showAndHideMessage(`Signed in successfully`, 'success');
        navigation.navigate('NicknameScreen'); // Navigation here
      })
      .catch(() => {
        setLoading(false);
        showAndHideMessage('Login failed', 'error');
        resetForm();
      });
    })
    .catch(() => {
      setLoading(false);
      showAndHideMessage('Google Sign-In successful, but failed to fetch user info.', 'error');
    });
  }
}, [response]);


  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const showAndHideMessage = (msg, type) => {
    setVisibleMessage(msg);
    setMessageType(type);
    setTimeout(() => setVisibleMessage(''), 1500);
  };

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      if (email.toLowerCase() === 'test@gmail.com' && password === 'password') {
        setLoading(false);
        showAndHideMessage('Signed in successfully', 'success');
        navigation.navigate('NicknameScreen');

      } else {
        setLoading(false);
        resetForm();
        showAndHideMessage('Login failed', 'error');
      }
    }, 2000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{ minHeight: '100%' }} keyboardShouldPersistTaps="handled">
          {/* --- Header --- */}
          <LinearGradient
            colors={['#a4508b', '#f86647']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradient}
          >
            <Text style={styles.appName}>DressMate</Text>
            <Text style={styles.tagline}>Your Personal Stylist</Text>
          </LinearGradient>

          {/* --- Floating Logo --- */}
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/logo.jpeg')}
              style={styles.floatingLogo}
              resizeMode="cover"
            />
          </View>

          {/* --- Login/Signup Form --- */}
          <View style={styles.formContainer}>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Sign in to discover your perfect outfit</Text>
            <TextInput
              style={styles.input}
              placeholder="📧 you@example.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="🔒 Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <Text style={{ fontSize: 20, color: '#aaa' }}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} disabled={loading}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              disabled={loading}
            >
              <LinearGradient colors={['#a4508b', '#f86647']} style={styles.gradientButton}>
                <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.providerButton}
              onPress={() => promptAsync()}
              disabled={loading}
            >
              <Image
                source={require('../../assets/google-logo.png')}
                style={{ width: 20, height: 20, marginRight: 12 }}
                resizeMode="contain"
              />
              <Text style={styles.providerButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={8}
              style={styles.providerButtonApple}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  alert(`Apple Sign-In successful!\nEmail: ${credential.email}`);
                  navigation.navigate('NicknameScreen');
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED') {
                    alert('Apple Sign-In cancelled');
                  } else {
                    alert('Apple Sign-In error');
                  }
                }
              }}
              disabled={loading}
            />

            <View style={styles.signupContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={loading}>
                <Text style={{ color: '#a4508b', marginTop: 16 }}>
                  Don't have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* --- Bottom Footer --- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our <Text style={{ color: '#a4508b' }}>Terms & Privacy Policy</Text>
          </Text>
        </View>

        {loading && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#a4508b" />
          </View>
        )}

        {!!visibleMessage && (
          <View style={styles.toastContainer}>
            <View
              style={[
                styles.toast,
                messageType === 'error' ? styles.toastError : styles.toastSuccess,
              ]}
            >
              <Text style={styles.toastIcon}>{messageType === 'success' ? '✔' : '✖'}</Text>
              <Text style={styles.toastText}>{visibleMessage}</Text>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  gradient: {
    height: 170,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 42,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'visible',
  },
  logoWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    top: 125, // half logo in gradient, half in form. Adjust carefully for your look.
    zIndex: 10,
    overflow: 'visible',
  },
floatingLogo: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#fff',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    android: {
      elevation: 10,
      backgroundColor: '#fff',
    }
  }),
  zIndex: 11,
},

  appName: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginBottom: 2, textAlign: 'center' },
  tagline: { fontSize: 16, color: '#fff', marginBottom: 10, textAlign: 'center' },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 64, // space for floating logo
    borderRadius: 24,
    padding: 24,
    elevation: 3,
    shadowColor: '#a4508b',
    overflow: 'visible',
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#222'
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    paddingHorizontal: 0,
  },
  eyeButton: {
    padding: 8,
    marginRight: 8,
    zIndex: 1,
  },
  forgot: {
    color: '#a4508b',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 16,
    marginTop: -8,
  },
  signInButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradientButton: {
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  providerButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    width: '100%',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  providerButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  providerButtonApple: {
    borderRadius: 8,
    width: '100%',
    height: 48,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  spinnerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
    zIndex: 1000,
  },
  toastContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: 'center',
    zIndex: 2000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 150,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  toastSuccess: {
    backgroundColor: '#daf9e1',
  },
  toastError: {
    backgroundColor: '#ffe7e6',
  },
  toastIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  toastText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    paddingBottom: 18,
    zIndex: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});
