import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ArrowRight } from 'lucide-react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement navigation to OTP page once it exists
      // router.push('/auth/forgototp');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContent}>
          {/* Logo */}
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter your email address to receive a password reset code.</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#3A7CA5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendOTP}
            disabled={isLoading || !email}
          >
            <Text style={styles.sendButtonText}>{isLoading ? 'Sending...' : 'Send OTP'}</Text>
            {!isLoading && <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('/auth/login')}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7CA5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  innerContent: {
    alignItems: 'center',
    width: '100%',
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: '#F4F8FB',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 18,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  sendButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  backToLogin: {
    marginTop: 8,
  },
  backToLoginText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
}); 